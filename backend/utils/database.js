const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successfull");
  } catch (err) {
    console.log("Connection failed");
    process.exit(0);
  }
};

module.exports = connectDb;
