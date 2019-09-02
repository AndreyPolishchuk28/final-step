const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const API_PORT = 9000;

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "static/build")))

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')))

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`))