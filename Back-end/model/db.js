// Import mongoose
const mongoose = require('mongoose');

// Load connection string
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

// Connect to the database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the connection instance
const db = mongoose.connection;

// Handle connection events
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = db; // You can export the connection if you need to use it elsewhere