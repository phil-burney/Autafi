const User = require('../../models/user')
const mailgun = require("mailgun-js")
const PasswordResetToken = require('../../models/passwordresettoken')

exports.resetPassword = async function(req, res) {
    let userID = req.body.id
    let passwordResetToken = await PasswordResetToken.findOne({userId: userID});
    if (!passwordResetToken) {
        res.status(404).send({ message: "User does not have an existing link!" })
        return
    }
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    if (!isValid) {
        res.status(404).send({ message: "The token is invalid!" })
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


}

exports.emailToResetPassword = async function(req, res) {

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



}