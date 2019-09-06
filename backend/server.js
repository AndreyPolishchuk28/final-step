const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const sessionsStore = new MongoDBStore({uri: uri, databaseName: 'final_project', collection: 'mySessions'});
const API_PORT = 9000;
const app = express();

client.connect(err => {
    app.products = client.db("final_project").collection("products");
    app.users = client.db("final_project").collection("users");
    app.baskets = client.db("final_project").collection("baskets");
    app.orders = client.db("final_project").collection("orders");
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "static/build")));
app.use(flash());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(session({
    secret: 'adgl',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: sessionsStore,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new localStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        app.users.findOne({ 'email' :  username },
            function(err, user) {
                if (err)
                    return done(err);
                if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false, req.flash('message', 'User Not found.'));
                }
                if (user.password !== password){
                    console.log('Invalid Password');
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                return done(null, user);
            }
        );
    }));

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

app.get('/products/:id', authenticationMiddleware(), async (req, res) => {
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

app.post('/login', passport.authenticate('login', {
/*    successRedirect: '/',
    failureRedirect: '/',*/
    failureFlash : true
}));

app.post('/customer', async (req, res) => {
    let user = await app.users.findOne(ObjectId(req.body.id));
    res.send(JSON.stringify(user))
});

app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'static/build/index.html')));

app.listen(API_PORT, () => console.log(`Server listening on port ${API_PORT}`));

function authenticationMiddleware() {
    console.log("authentication");
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}