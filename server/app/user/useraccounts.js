const User = require('../../models/user')
exports.signUp = async function(req, res) {
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
}
exports.validateToken= async function(req, res) {
    let token = req.cookies['token']
    if (token) {
        User.findByToken(token).then((data) => {
            res.status(200);
        })
    } else {
        res.status(404);
    }

}
exports.userLogin= async function(req, res) {

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


}
exports.userLogout= async function(req, res) {
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
};