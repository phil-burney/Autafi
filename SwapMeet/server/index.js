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
const { createSuper } = require('typescript');

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//connect to mongo db
const dbURI = 'mongodb+srv://admin:1234@cluster.n0ev0.mongodb.net/swapmeet?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedtopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));


router.use('/api', function (req, res, next) {
    // ... maybe some additional /bar logging ...
    next();
});
app.use(cors({
    origin: true,
    credentials: true
}));
// Serve static html/js/css content publically

//session cookie
app.use(cookieParser());

//session middleware
app.use(session({
    secret: "secretsessionkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

let numUsers = 0;
let carBounties = 0;
let partBounties = 0;
let carSales = 0;
let partSales = 0;



app.post("/api/partbounty", upload.single('partImage'), function (req, res) {
    console.log("POST /partbounty");

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

    console.log(req.body)
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
    User.findByToken(req.body.token).then((data) => {
        console.log(data.username + " pinged the server")
        if (data != null) {
            let packet = { username: data.username, email: data.email }
            console.log(packet)
            res.status(200).send(packet);
        }
        else {
            res.status(404).send({ message: "User not found!" });
        }
    })
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
                            httpOnly: true
                        }).cookie("email", user.email, {
                            sameSite: 'strict',
                            httpOnly: true
                        }).send({ message: "Login Successful!  Here's a cookie." })
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
    req.session.destroy();

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