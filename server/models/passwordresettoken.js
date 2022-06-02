const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, //  expiry time in seconds
  },
});
tokenSchema.statics.findByHashedToken = async function (hashedToken) {
  const token = await PasswordResetToken.findOne({ hashedToken });
  if (!token) {
    return null;
  }
  return token
}
const PasswordResetToken = mongoose.model("passwordresettoken", tokenSchema);
module.exports = PasswordResetToken