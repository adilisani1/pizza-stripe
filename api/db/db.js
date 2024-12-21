const mongoose = require("mongoose");
require('dotenv').config();  

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Database connection failed", err);
  }
};

module.exports = connectDB;
