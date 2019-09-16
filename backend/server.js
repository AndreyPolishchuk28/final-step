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
    app.catalog = client.db("final_project").collection("catalog");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static/build")));

app.get('/main_info', async (req, res) => {
    let categoriesData = await app.catalog.findOne({"name": "categories"});
    let sliderProductsData = await app.catalog.findOne({"name": "sliderProducts"});
    let sliderProducts = await app.products.find({"id": {$in: [...sliderProductsData.sliderProducts]}}).toArray();
    let mostPopularProductsData = await app.catalog.findOne({"name": "mostPopularProducts"});
    let mostPopularProducts = await app.products.find({"id": { $in: [...mostPopularProductsData.mostPopularProducts]}}).toArray();
    let reqBody = {
        categories: categoriesData.categories,
        sliderProducts: sliderProducts,
        mostPopularProducts: mostPopularProducts
    };
    res.send(JSON.stringify(reqBody));
});

app.get('/products/:id', async (req, res) => {
    let prod = await app.products.findOne({'id': req.params.id});
    res.send(JSON.stringify(prod))
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
    const {category, producer, skip, limit} = req.body;
    if (producer.length) {
        await app.products.find({"category": category, "producer":{ $in: [...producer]}}).skip(skip).limit(limit).forEach((item) => {
            prodArray.push(item)
        });
    } else {
        await app.products.find({"category": category}).skip(skip).limit(limit).forEach((item) => {
            prodArray.push(item)
        });
    }
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
            res.send(JSON.stringify({loginStatus: true}))
        }else {
            res.send(JSON.stringify({loginStatus: false, message: 'Invalid password'}))
        }
    } else {
        res.send(JSON.stringify({loginStatus: false, message:'User is not found'}))
    }
});

app.get('/logout', async (req, res) => {
    await app.sessions.removeOne({"sessionKey": req.cookies.sessionKey});
    res.clearCookie('sessionKey').clearCookie('basket').send();
});

app.get('/get_login_status', async (req, res) => {
    if (req.cookies.sessionKey && await app.sessions.findOne({sessionKey: req.cookies.sessionKey})) {
        res.send(JSON.stringify({loginStatus: true}))
    } else  {
        res.send(JSON.stringify({loginStatus: false}))
    }
});

app.post('/new_user', async (req, res) => {
    if (await app.users.findOne({"email": req.body.email})) {
        res.send(JSON.stringify({registered: false}))
    } else {
        let user = {...req.body, orders: [], basket: ''};
        if (req.cookies.basket) {
            user.basket = req.cookies.basket
        }
        const insertedUser = await app.users.insertOne(user);
        const sessionKey = insertedUser.insertedId + Date.now();
        await app.sessions.insertOne({sessionKey: sessionKey, userId: insertedUser.insertedId});
        res.cookie('sessionKey', sessionKey, {maxAge: 2592000000});
        res.send(JSON.stringify({registered: true}))
    }
});

app.get('/get_user_info', checkAuthMiddleware(), async (req, res) => {
    const user = await app.users.findOne(ObjectId(req.cookies.sessionKey.slice(0, 24)));
    if (user.orders) {
        const orders = await app.orders.find({"_id": {$in: [...user.orders]}}).toArray();
        user.orders = orders
    };
    res.send(JSON.stringify(user))
});

app.post('/change_user_info', checkAuthMiddleware(), async (req, res) => {
    await app.users.updateOne({"_id": ObjectId(req.cookies.sessionKey.slice(0, 24))}, {
        $set: {...req.body}
    });
    const user = await app.users.findOne(ObjectId(req.cookies.sessionKey.slice(0, 24)));
    res.send(JSON.stringify(user))
});

app.post('/add_to_basket', async (req, res) => {
    let prod = await app.products.findOne({'id': req.body.id});
    if (req.cookies.basket) {
        let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
        if(currentBasket.products.some((item) => item.id === req.body.id)) {
            currentBasket.products.forEach((item) => {
                if (item.id === req.body.id) {item.quantity = +item.quantity + +req.body.quantity}
            })
        } else {
            currentBasket.products.push({...req.body, product: prod})
        }
        await app.baskets.updateOne({"_id": ObjectId(req.cookies.basket)}, {
            $set: {products: currentBasket.products}
        });
        res.send(JSON.stringify(await app.baskets.findOne(ObjectId(req.cookies.basket))));
    } else {
        let basket = await app.baskets.insertOne({
            products: [{...req.body, product: prod}]
        });
        res.cookie('basket', basket.insertedId);
        if (req.cookies.sessionKey && await app.sessions.findOne({"sessionKey": req.cookies.sessionKey})) {
            await app.users.updateOne({"_id": ObjectId(req.cookies.sessionKey.slice(0, 24))}, {
                $set: {basket: basket.insertedId}
            })
        }
        res.send(JSON.stringify(await app.baskets.findOne(ObjectId(basket.insertedId))));
    }
});

app.get('/remove_from_basket/:id', async (req, res) => {
    let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
    const itemIndex = currentBasket.products.findIndex((item) => item.id === req.params.id);
    currentBasket.products.splice(itemIndex, 1);
    await app.baskets.updateOne({"_id": ObjectId(req.cookies.basket)}, {
        $set: {products: currentBasket.products}
    });
    res.send(JSON.stringify(await app.baskets.findOne(ObjectId(req.cookies.basket))));
});

app.post('/change_quantity', async (req, res) => {
    let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
    currentBasket.products.forEach((item) => {
        if (item.id === req.body.id) {item.quantity = req.body.quantity}
    });
    await app.baskets.updateOne({"_id": ObjectId(req.cookies.basket)}, {
        $set: {products: currentBasket.products}
    });
    res.send(JSON.stringify(await app.baskets.findOne(ObjectId(req.cookies.basket))));
});

app.get('/get_basket', async (req, res) => {
    if (req.cookies.basket) {
        let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
        res.send(JSON.stringify(currentBasket))
    } else {
        res.send()
    }
});

app.post('/create_order', async (req, res) => {
    let currentBasket = await app.baskets.findOne(ObjectId(req.cookies.basket));
    await app.baskets.removeOne(ObjectId(req.cookies.basket));
    const orderMongoDBItem = app.orders.insertOne({...req.body, basket: currentBasket});
    if (req.cookies.sessionKey) {
        const user = await app.users.findOne(ObjectId(req.cookies.sessionKey.slice(0, 24)));
        await app.users.updateOne({"_id": ObjectId(req.cookies.sessionKey.slice(0, 24))}, {
            $set: {orders: [...user.orders, orderMongoDBItem.insertedId]}
        });
    }
    res.clearCookie('basket').send();
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

function checkAuthMiddleware() {
    return async function (req, res, next) {
        const findResult = await app.sessions.findOne({"sessionKey": req.cookies.sessionKey});
        if (findResult) {
            return next()
        }
        res.send(JSON.stringify({message: 'Prohibited'}))
    }
}