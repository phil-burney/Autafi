const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')
const User = require('../models/user')
require('dotenv').config({ path: __dirname + "/.env" })
async function connect() {
  // connect to mongo db
  const dbURI = process.env.DATABASE_URI
  let connect = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedtopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));
}
async function seedUser() {
  let user = {
    username: "GenericUser",
    email: "philburney@ymail.com",
    password: "Password123*"
  }
  const newUser = new User(user);
  await newUser.save()
  let x = await User.find({username: "GenericUser"})
}
async function clearDatabase() {
  await mongoose.connection.dropDatabase();
}


module.exports = { connect, seedUser, clearDatabase }