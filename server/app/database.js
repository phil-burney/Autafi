const {MongoClient} = require('mongodb')
// exports.setupDatabase = function () {
//     // connect to mongo db
//     const dbURI = process.env.DATABASE_URI
//     let connect = mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedtopology: true })
//         .then((result) => console.log("Connected to database"))
//         .catch((err) => console.log(err));
// }

// onst { MongoClient } = require('mongodb')
// const uri = process.env.MONGO_URI
// if (!uri) {
//   throw new Error('Missing MONGO_URI')
// }

const client = new MongoClient(process.env.DATABASE_URI)
async function connect() {
  // Connect the client to the server
  await client.connect()
}

async function disconnect() {
  // Ensures that the client will close when you finish/error
  await client.close()
}

module.exports = { connect, disconnect }