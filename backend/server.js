const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cookieParser = require('cookie-parser');

const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const API_PORT = 9000;
const app = express();

client.connect(err => {
    app.products = client.db("final_project").collection("products");
    app.users = client.db("final_project").collection("users");
    app.baskets = client.db("final_project").collection("baskets");
    app.orders = client.db("final_project").collection("orders");
    app.sessions = client.db("final_project").collection("mySessions");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static/build")));

app.get('/category/:id', async (req, res) => {
    let reqBody = {
        name: req.params.id,
        products: []
    };
    await app.products.find({}).forEach((item) => {
        if (item.category.toLowerCase() === req.params.id.toLowerCase()) {
            reqBody.products.push(item)
        }
    });
    res.send(reqBody)
});

app.get('/products/:id', async (req, res) => {
    let prod = await app.products.findOne({'id': req.params.id});
    res.send(prod)
});

app.post('/product_search', async (req, res) => {
    let prodArray = [];
    let searchLength = req.body.q.length;
    await app.products.find({}).forEach((item) => {
        if (item.name.slice(0, searchLength).toLowerCase() === req.body.q.toLowerCase()) {
            prodArray.push(item)
        }
    });
    res.send(JSON.stringify(prodArray))
});

app.post('/get_products', async (req, res) => {
    let prodArray = [];
    const {category, skip, limit} = req.body;
    await app.products.find({"category": category}).skip(skip).limit(limit).forEach((item) => {
        prodArray.push(item)
    });
    res.send(JSON.stringify(prodArray))
});

app.post('/login', async (req, res) => {
    const user = await app.users.findOne({"email": req.body.username});
    let sessionKey;
    if (user) {
        sessionKey = user._id + Date.now();
        if (user.password === req.body.password) {
            await app.sessions.insertOne({sessionKey: sessionKey, userId: user._id});
            res.cookie('sessionKey', sessionKey, {maxAge: 2592000000});
            if (user.basket) {
                res.cookie('basket', user.basket, {maxAge: 2592000000});
            }
            res.send('Logged')
        }else {
            res.send('Invalid password')
        }
    } else {
        res.send('User is not found')
    }
});

app.get('/logout', async (req, res) => {
    await app.sessions.removeOne({"sessionKey": req.cookies.sessionKey});
    res.clearCookie('sessionKey').send('Logouted');
});

app.get('/get_login_status', async (req, res) => {
    if (req.cookies.sessionKey && await app.sessions.findOne({sessionKey: req.cookies.sessionKey})) {
        res.send(true)
    } else  {
        res.send(false)
    }
});

app.post('/customer', async (req, res) => {
    const user = await app.users.findOne(ObjectId(req.body.id));
    res.send(JSON.stringify(user))
});

app.post('/add_to_basket', async (req, res) => {
    if (req.cookies.basket) {
        let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
        if(currentBasket.products.some((item) => item.id === req.body.id)) {
            currentBasket.products.forEach((item) => {
                if (item.id === req.body.id) {item.quantity = +item.quantity + +req.body.quantity}
            })
        } else {
            currentBasket.products.push(req.body)
        }
        await app.baskets.updateOne({"_id": ObjectId(req.cookies.basket)}, {
            $set: {
                products: currentBasket.products
            }
        });
        res.send('product is added');
    } else {
        let basket = await app.baskets.insertOne({
            products: [req.body]
        });
        res.cookie('basket', basket.insertedId).send('created new basket');
        if (req.cookies.sessionKey && await app.sessions.findOne({"sessionKey": req.cookies.sessionKey})) {
            await app.users.updateOne({"_id": ObjectId(req.cookies.sessionKey.slice(0, 24))}, {
                $set: {basket: basket.insertedId}
            })
        }
    }
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

function checkAuthMiddleware() {
    return async function (req, res, next) {
        const findResult = await app.sessions.findOne({"sessionKey": req.cookies.sessionKey});
        if (findResult) {
            return next()
        }
        console.log('Prohibited')
    }
}