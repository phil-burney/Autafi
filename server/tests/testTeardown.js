const { connectDB, disconnectDB } = require('./database');
const { app, server } = require('../index');
var path = require('path');
require('dotenv').config({ path: path.normalize(__dirname + "../.env")  })
async function endTest() {
    disconnectDB();
    console.log("server closed")
    server.close();
   
    
}
module.exports = {endTest}
