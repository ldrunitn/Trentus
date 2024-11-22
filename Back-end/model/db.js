// Import mongoose
const mongoose = require('mongoose');

// // Load connection string
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoURI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch(error){
    console.log("Error while connecting to db: " + error);
  }
}
run().catch(console.dir);
// mongoose.set('debug', true);
let db = mongoose.connection;
module.exports = db; // You can export the connection if you need to use it elsewhere