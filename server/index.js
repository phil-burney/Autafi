/* eslint-disable */
require('dotenv').config({ path: "./.env" })
const express = require('express');
const app = express()
const router = express.Router()
const port = 3030;
const bodyParser = require('body-parser')
const multer = require('multer')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const upload = multer({ dest: 'uploads/' })
const mongoose = require('mongoose')
const User = require('./models/user')
const CarBounty = require('./models/carbounty')
const PartBounty = require('./models/partbounty')
const CarSale = require('./models/carsales')
const PartSale = require('./models/partsales');
const PasswordResetToken = require('./models/passwordresettoken')
const nodemailer = require('nodemailer')
const mailgun = require("mailgun-js")
const crypto = require('crypto');
const passwordresettoken = require('./models/passwordresettoken');
const bcrypt = require("bcryptjs")


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
// Serve static html/js/css content publically



//session middleware
app.use(session({
    secret: "secretsessionkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

//connect to mongo db
const dbURI = 'mongodb+srv://admin:1234@cluster.n0ev0.mongodb.net/swapmeet?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedtopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));


router.use('/api', function (req, res, next) {
    // ... maybe some additional /bar logging ...
    next();
});


let numUsers = 0;
let carBounties = 0;
let partBounties = 0;
let carSales = 0;
let partSales = 0;



app.post("/api/partbounty", upload.single('partImage'), function (req, res) {
    console.log("POST /partbounty");
    console.log(req.body);
    const newpart = new PartBounty({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        part: req.body.part,
        description: req.body.description,
        bounty: req.body.bounty,
        images: req.body.photos,
        email: req.body.email,
    });

    newpart.save()
        .then(() => {
            // send back response
            res.status(200).send({ message: 'Part successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/api/partbounty', (req, res) => {

    console.log("GET /partbounty");
    PartBounty.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post("/api/carbounty", upload.single('carImage'), function (req, res) {

    console.log("POST /carbounty");
    console.log(req.body);

    //Currently only posting car to database without image
    const newcar = new CarBounty({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        bounty: req.body.bounty,
        images: req.body.photos,
        email: req.body.email,
    });

    newcar.save()
        .then(() => {
            // send back response
            res.status(200).send({ message: 'Part successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/api/carbounty', (req, res) => {

    console.log("GET /carbounty");
    CarBounty.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/api/user/signup', (req, res) => {
    console.log("new user");
    console.log(req.body);
    //Find identical email
    User.findByEmail(req.body.email).then((data) => {
        console.log(data)
        if (data == null) {
            // Find identical username
            User.findByName(req.body.username).then((data) => {
                console.log(data)
                if (data == null) {
                    createUser()
                }
                else {
                    res.status(403).send({ message: 'Username already exists!' });
                }
            })
        }
        else {
            console.log("bad email")
            res.status(403).send({ message: 'Email already associated with another account!' });
        }
        return
    })
    function createUser() {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        newUser.save();
        res.status(200).send({ message: 'User added' });
    }
})

app.put('/api/user/validatetoken', (req, res) => {
    console.log(req.cookies)
    let token = req.cookies['token']
    if (token) {
        User.findByToken(token).then((data) => {
            console.log(data.username + " pinged the server")
            res.status(200).send({ message: "User found!" });
        })
    } else {
        res.status(404).send({ message: "User not found!" });
    }

})

app.put('/api/user/resetpassword', async (req, res) => {

    let user = await User.findByName(req.body.user);

    let token = await PasswordResetToken.findOne({ user: user._id });
    console.log(token)
    console.log(req.body.token)
    let isValid;
    if (token) {
        isValid = await bcrypt.compare(req.body.token, token.token);
    }
    console.log(isValid)
    if (isValid) {
        user.password = req.body.password;
        await user.save()
        res.status(200).send({ message: "Password changed successfully" })

    } else {
        res.status(404).send({ message: "The link has expired!" })
    }


})

app.put('/api/user/email/resetpassword', async (req, res) => {


    const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    const data = {
        from: 'passwordreset@autaphi.com',
        to: req.body.email,
        subject: 'Password Reset Information',
    };
    let resetToken = crypto.randomBytes(32).toString("hex");
    let user = await User.findByEmail(req.body.email);

    let link = `${process.env.BASE_URL}/resetpassword/form/?token=${resetToken}&user=${user.username}`

    if (user != null) {
        data.html = '<h3> Password Reset </h3> <div> Hello! A password reset has been requested for your account.  In order to do so, follow the' +
            ' link below.  The link expires in one hour ' + link + '</div>'
        // See if token exists and if so, delete it
        let dbToken = await PasswordResetToken.findOne({ user: user._id });
        if (dbToken) {
            await dbToken.deleteOne();
        }
        bcrypt.genSalt(10, async function (saltError, salt) {
            if (saltError) {
                return saltError
            } else {
                await bcrypt.hash(resetToken, salt, async function (hashError, hash) {
                    if (hashError) {
                        return
                    }
                    await new PasswordResetToken({
                        userId: user._id,
                        token: hash,
                        createdAt: Date.now(),
                    }).save();
                })
            }
        })

    } else {
        data.html = '<h3> Password Reset </h3> <div> Hello! A password reset has been requested.  However, there is no Autafi account' +
            ' asscociated with this email. </div>'
    }
    mg.messages().send(data, function (error, body) {
        if (error) {
            res.status(error.statusCode).send({ message: "Server error.  Please Try Again" });
        } else {
            res.status(200).send({ message: "Success!" });
        }
    });



})


app.post('/api/login', (req, res) => {

    if (User.validLogin(req.body.username, req.body.password)) {
        User.findByCredentials(req.body.username, req.body.password)
            .then((user) => {
                if (user != null) {
                    let newToken = user.generateAuthToken()
                    user.token = newToken;
                    console.log(user.username + " has logged in.");
                    user.save().then(() => {
                        res.cookie("token", newToken, {
                            sameSite: 'strict',
                            httpOnly: true
                        }).cookie("name", user.username, {
                            sameSite: 'strict',
                            httpOnly: false
                        }).cookie("email", user.email, {
                            sameSite: 'strict',
                            httpOnly: false
                        }).send({ message: "Login Successful!  Here's a cookie.", username: user.username })
                    });
                } else {
                    res.status(403).send({ message: "Wrong login information" });
                }
            })


    } else {
        res.status(403).send({ message: "Wrong login information" });
    }


})

app.put('/api/logout', (req, res) => {
    console.log('logout')
    if (req.cookies['name']) {
        User.findByName(req.cookies['name']).then(user => {
            user.token = null;
            console.log(req.cookies['name'] + " has logged out.");
            user.save().then(() => {
                res.clearCookie("token")
                    .clearCookie("name")
                    .clearCookie("email")
                    .send({ message: "Logout Successful!" })
            });
        })
    } else {
        res.clearCookie("token")
            .clearCookie("name")
            .clearCookie("email")
            .send({ message: "Logout Successful!" })
    }



});

app.post("/api/partsale", upload.single('partImage'), function (req, res) {
    console.log("POST /partsale");

    const newpart = new PartSale({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        part: req.body.part,
        description: req.body.description,
        salePrice: req.body.salePrice,
        images: req.body.photos,
        email: req.body.email,
    });

    newpart.save()
        .then((result) => {
            // send back response
            res.status(200).send({ message: 'Part successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })

})

app.get('/api/partsale', (req, res) => {

    console.log("GET /partsale");

    PartSale.find({}).exec(function (error, posts) {
        res.send(posts);
    })
})

app.post("/api/carsale", upload.single('carImage'), function (req, res) {

    console.log("POST /carsale");

    //Currently only posting car to database without image
    const newcar = new CarSale({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        salePrice: req.body.salePrice,
        images: req.body.photos,
        email: req.body.email,
    });

    newcar.save()
        .then(() => {
            // send back response
            res.status(200).send({ message: 'Car Sale successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/api/carsale', (req, res) => {

    console.log("GET /carsale");
    CarSale.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/api/appstatus', (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log("GET /appstatus")
    User.find()
        .then((result) => {
            numUsers = result.length;
            CarBounty.find()
                .then((response) => {
                    carBounties = response.length;
                })
            CarSale.find()
                .then((response) => {
                    carSales = response.length;
                })
            PartSale.find()
                .then((response) => {
                    partSales = response.length;
                })
            PartBounty.find()
                .then((response) => {
                    partBounties = result.length;
                    res.status(200).send({
                        users: numUsers,
                        carBounties: carBounties,
                        partBounties: response.length,
                        carSales: carSales,
                        partSales: partSales,
                        updated: dateTime
                    })
                })
        })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})