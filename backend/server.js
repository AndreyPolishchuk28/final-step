const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const API_PORT = 9000;
const app = express();

client.connect(err => {
    app.db = client.db("final_project").collection("final_project");
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "static/build")));

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));