
/* eslint-disable */


require('dotenv').config({ path: __dirname + "/.env" })
const path = require('path');
const express = require('express');
const app = express()
const router = express.Router()
const port = 3030;
const bcrypt = require("bcryptjs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const {connect} = require("./database")
const User = require('../models/user')

var multer = require('multer');
var fs = require('fs-extra');
const userAccountRecovery = require('./user/useraccountrecovery')
const userAccounts = require('./user/useraccounts')
const partSales = require('./sale/part')
const carSales = require('./sale/car')
const carBounties = require('./bounty/car')
const partBounties = require('./bounty/part')
const databaseHelper = require('./database')
global.__basedir = path.dirname(__dirname);
// Serve static image content publicly
app.use(express.static('uploads'));
// Set up multer
var storage = multer.diskStorage({

    destination: (req, file, cb) => {
        let dir = (__dirname + '\\uploads\\temp\\' + req.body.email)
        req.body.dest = dir
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        let fileFormat = file.mimetype.split('/');
        cb(null, 'photo' + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
});

var upload = multer({ storage: storage });




app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//session cookie
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('mode', 'cors');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Credentials,Access-Control-Allow-Methods,Content-Type");

    next();
});

//session middleware
app.use(session({
    secret: "secretsessionkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

//Start database



app.get('/api', function (req, res) {
    res.status(200).send({ message: 'API works!' });
});
app.get('/api/user/:id', (req, res) => {

    User.getPostsByName(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

// Handle user account recovery
app.put('/api/user/resetpassword', userAccountRecovery.resetPassword)
app.put('/api/user/email/resetpassword', userAccountRecovery.emailToResetPassword)
// Handle users
app.post('/api/user/signup', userAccounts.signUp)
app.put('/api/user/validatetoken', userAccounts.validateToken)
app.post('/api/user/login', userAccounts.userLogin)
app.put('/api/user/logout', userAccounts.userLogout)
// Handle bounties
app.post("/api/bounty/car", upload.array("photo"), carBounties.newCarBounty)
app.get('/api/bounty/car', carBounties.getAllCarBounties)
app.post("/api/bounty/part", upload.array("photo"), partBounties.newPartBounty)
app.get('/api/bounty/part', partBounties.getAllPartBounties)
// Handle sales
app.post("/api/sale/part", upload.array("photo"), partSales.newPartSale)
app.get('/api/sale/part', partSales.getAllPartSales)
app.post("/api/sale/car", upload.array("photo"), carSales.newCarSale)
app.get('/api/sale/car', carSales.getAllCarSales)

async function server() {
    let db = await connect()
    const server = app.listen(port, console.log(`Example app listening at http://localhost:${port}`))

}
server()

module.exports = { app, server };