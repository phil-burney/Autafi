

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create({instance:{port: 27017}});
      console.log(`MongoDB connected at port: ${mongod._instanceInfo.port}`);
      return;
    }
    
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };