const bcrypt = require("bcryptjs")
class PasswordResetTokenHelper {

    static async hashToken(token) {
        let retHash
        let x = await bcrypt.hash(token, 10, function(err, hash) {
            console.log(hash)
            return hash
            
        });
        return x
    }
}
module.exports = PasswordResetTokenHelper