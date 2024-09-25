const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    // Skipping MongoDB connection in test environment
    return;
  }
  
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Atlas Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { connectDB };
