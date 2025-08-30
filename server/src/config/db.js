const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green_h2_map';

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    // useNewUrlParser/useUnifiedTopology no longer required in latest mongoose versions
  });
  console.log('MongoDB connected to', MONGO_URI);
}

module.exports = { connectDB };
