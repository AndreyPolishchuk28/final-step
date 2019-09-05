const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const API_PORT = 9000;
const app = express();

client.connect(err => {
    app.products = client.db("final_project").collection("products");
    app.users = client.db("final_project").collection("users");
    app.baskets = client.db("final_project").collection("baskets");
    app.orders = client.db("final_project").collection("orders");
    app.products.updateMany({}, {
        $set: {
            "category": "guitars"
        }
    })
});

app.use(bodyParser.json());

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
    res.status(200).send(reqBody)
});

app.get('/products/:id', async (req, res) => {
    let prod = await app.products.findOne({'id': req.params.id});
    res.status(200).send(prod)
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
    let {category, skip, limit} = req.body;
    await app.products.find({"category": category}).skip(skip).limit(limit).forEach((item) => {
        prodArray.push(item)
    });
    res.send(JSON.stringify(prodArray))
});

app.post('/customer', async (req, res) => {
    let user = await app.users.findOne(ObjectId(req.body.id));
    res.send(JSON.stringify(user))
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

console.log("ok");
