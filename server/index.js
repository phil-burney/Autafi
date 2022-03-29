/* eslint-disable */
var path = require('path');

require('dotenv').config({ path: __dirname + "/.env" })
const express = require('express');
const app = express()
const router = express.Router()
const port = 3030;
const bcrypt = require("bcryptjs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user')
const CarBounty = require('./models/carbounty')
const PartBounty = require('./models/partbounty')
const CarSale = require('./models/carsales')
const PartSale = require('./models/partsales');
const PasswordResetTokenHelper = require("./hashpasswordtoken")
const PasswordResetToken = require('./models/passwordresettoken')
const mailgun = require("mailgun-js")
const crypto = require('crypto');
var multer = require('multer');
var fs = require('fs-extra');



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

// Serve static image content publicly


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

//connect to mongo db
const dbURI = process.env.DATABASE_URI
let connect = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedtopology: true })
    .then((result) => console.log(result.connection._connectionString))
    .catch((err) => console.log(err));


app.get('/api', function (req, res) {
    res.status(200).send({ message: 'API works!' });
});

app.post("/api/partbounty", upload.array("photo"), async function (req, res) {
    const newpart = new PartBounty({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        part: req.body.part,
        description: req.body.description,
        bounty: req.body.bounty,
        email: req.body.email,
    });
    let dir = path.join(__dirname + '/uploads/part/bounty/' + newpart._id)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.move(req.body.dest, dir, { overwrite: true }, () => {
        console.log("move successful")
        fs.readdirSync(dir).forEach((img) => {
            newpart.images.push(process.env.THIS_URL + '/part/bounty/' + newpart._id + '/' + img)
        })
        newpart.save()
            .then(() => {
                res.status(200).send({ message: 'Part successfully entered' });
            })
            .catch((err) => {
                console.log(err);
            })
    })
})

app.get('/api/partbounty', (req, res) => {
    PartBounty.find()

        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post("/api/carbounty", upload.array("photo"), async function (req, res) {


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
    let dir = path.join(__dirname + '/uploads/car/bounty/' + newcar._id)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.move(req.body.dest, dir, { overwrite: true }, () => {
        console.log("move successful")
        fs.readdirSync(dir).forEach((img) => {
            newcar.images.push(process.env.THIS_URL + '/car/bounty/' + newcar._id + '/' + img)
        })
        newcar.save()
            .then(() => {
                // send back response
                res.status(200).send({ message: 'Part successfully entered' });
            })
            .catch((err) => {
                console.log(err);
            })
    })

})

app.get('/api/carbounty', (req, res) => {

    CarBounty.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
app.get('/api/user/:id', (req, res) => {

    User.getPostsByName(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
app.post("/api/partsale", upload.array("photo"), async function (req, res) {

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

    let dir = path.join(__dirname + '/uploads/part/sale/' + newpart._id)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.move(req.body.dest, dir, { overwrite: true }, () => {
        console.log("move successful")
        fs.readdirSync(dir).forEach((img) => {
            newpart.images.push(process.env.THIS_URL + '/part/sale/' + newpart._id + '/' + img)
        })
        newpart.save()
            .then(() => {
                res.status(200).send({ message: 'Part successfully entered' });
            })
            .catch((err) => {
                console.log(err);
            })
    })


})

app.get('/api/partsale', (req, res) => {


    PartSale.find({}).exec(function (error, posts) {
        res.send(posts);
    })
})

app.post("/api/carsale", upload.array("photo"), async function (req, res) {


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

    let dir = path.join(__dirname + '/uploads/car/sale/' + newcar._id)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.move(req.body.dest, dir, { overwrite: true }, () => {
        console.log("move successful")
        fs.readdirSync(dir).forEach((img) => {
            newcar.images.push(process.env.THIS_URL + '/car/sale/' + newcar._id + '/' + img)
        })
        newcar.save()
            .then(() => {
                res.status(200).send({ message: 'Car successfully entered' });
            })
            .catch((err) => {
                console.log(err);
            })
    })
})

app.get('/api/carsale', (req, res) => {

    CarSale.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})
app.post('/api/user/signup', (req, res) => {
    //Find identical email
    User.findByEmail(req.body.email).then((data) => {
        if (data == null) {
            // Find identical username
            User.findByName(req.body.username).then((data) => {
                if (data == null) {
                    createUser()
                }
                else {
                    res.status(403).send({ message: 'Username already exists!' });
                }
            })
        }
        else {
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
    let token = req.cookies['token']
    if (token) {
        User.findByToken(token).then((data) => {
            res.status(200);
        })
    } else {
        res.status(404);
    }

})

app.put('/api/user/resetpassword', async (req, res) => {
    let userID = req.body.id
    let passwordResetToken = await PasswordResetToken.findOne({userId: userID});
    if (!passwordResetToken) {
        res.status(404).send({ message: "The link is invalid!" })
        return
    }
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    if (!isValid) {
        res.status(404).send({ message: "The link is invalid!" })
        return 
    }

    let user = await User.findOne(passwordResetToken.userId)
    user.password = req.body.password;
    await user.save()
    await passwordResetToken.delete();

    const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    const data = {
        from: 'passwordresetconfirmation@autafi.com',
        to: user.email,
        subject: 'Password Reset Confirmation',
        html: '<h3> Password Reset </h3> <div> Hello! The Autafi account associated with this email has just had its password reset.' +
            '  If you believe that this was in error, please contact peburney@gmail.com. </div>'
    }
    mg.messages().send(data, function (error, body) {
        if (error) {
            res.status(error.statusCode).send({ message: "Server error.  Please Try Again" });
        } else {
            res.status(200).send({ message: "Password changed successfully" })
        }
    });


})


app.put('/api/user/email/resetpassword', async (req, res) => {

    const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
    const data = {
        from: 'passwordreset@autafi.com',
        to: req.body.email,
        subject: 'Password Reset Information',
    };
    let resetToken = crypto.randomBytes(32).toString("hex");
    let user = await User.findByEmail(req.body.email);

    let link = `${process.env.BASE_URL}/resetpassword/form/?token=${resetToken}&id=${user._id}`

    if (user != null) {
        data.html = '<h3> Password Reset </h3> <div> Hello! A password reset has been requested for your account.  In order to do so, follow the' +
            ' link below.  The link expires in one hour ' + link + '</div>'
        // See if token exists and if so, delete it
        let dbToken = await PasswordResetToken.findOne({userId: user._id})
        if(dbToken) {
            dbToken.delete()
        }
        let hash = await hashPassword(resetToken)
        await new PasswordResetToken({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save();

    } else {
        data.html = '<h3> Password Reset </h3> <div> Hello! A password reset has been requested.  However, there is no Autafi account' +
            ' asscociated with this email. </div>'
    }
    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log(error)
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
    if (req.cookies['name']) {
        User.findByName(req.cookies['name']).then(user => {
            if (user) {
                user.token = null;
                console.log(req.cookies['name'] + " has logged out.");
                user.save().then(() => {
                    res.clearCookie("token")
                        .clearCookie("name")
                        .clearCookie("email")
                        .send({ message: "Logout Successful!" })
                });
            } else {
                res.clearCookie("token")
                    .clearCookie("name")
                    .clearCookie("email")
                    .send({ message: "Logout Successful!" })
            }
        })
    } else {
        res.clearCookie("token")
            .clearCookie("name")
            .clearCookie("email")
            .send({ message: "Logout Successful!" })
    }



});



const server = app.listen(port, console.log(`Example app listening at http://localhost:${port}`))

const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};

module.exports = { app, server };