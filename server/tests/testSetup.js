const { connectDB, disconnectDB } = require('./database');
const { app, server } = require('../index');
var path = require('path');
require('dotenv').config({ path: path.normalize(__dirname + "../.env")  })
async function startTest() {
    let x = await connectDB()
    let y = await server
}
startTest()
module.exports = {startTest}
