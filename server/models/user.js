const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please Include  name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Include  email"]
  },
  password: {
    type: String,
    required: [true, "Please Include password"]
  },
  token: {
    type: String,
    required: [false]
  }

});

//this method will hash the password before saving the user model
// userSchema.pre("save", async function(next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

userSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, async function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        await bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})


//this method generates an auth token for the user
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ data: user.username, expiresIn: '24h' }, process.env.JWT_KEY)
  return token;
};
userSchema.statics.findByName = async function (username) {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  return user
}
userSchema.statics.findByEmail = async function (email) {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }
  return user
}
userSchema.statics.findByToken = async function (token) {
  return await User.findOne({ token })
}
userSchema.statics.validLogin = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return false
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return false
  }
  return true;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return null;
  }
  return user;
};

const User = mongoose.model("user", userSchema);
module.exports = User;