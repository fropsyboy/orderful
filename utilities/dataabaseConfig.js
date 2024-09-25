// I added database at first to save inputs and responses so if a user comes back with the same input I can just send them the output without running any service but after comparing the TOE of the service and fetching from the database, I decided to remove this bit since the service is a small service and runs faster than checking for repeatition and fetching from the database
// But this would be a good upgrade if the service grows bigger and a redis can be used instead of a whole database

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
