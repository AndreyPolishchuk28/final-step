const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const API_PORT = 9000;
const app = express();

client.connect(err => {
    app.products = client.db("final_project").collection("products");
    app.users = client.db("final_project").collection("users");
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
    let prod;
    prod = await app.products.findOne({'id': req.params.id});
    res.status(200).send(prod)
});


app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));
