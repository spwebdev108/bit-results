require('dotenv').config();
const mongoose = require('mongoose');
const Result = require("./models/res");
const initData = require("./data.js");

const dbUrl = process.env.ATLASDB_URI;

if (!dbUrl) {
  throw new Error("Database URL is undefined. Check your .env file and ATLASDB_URI variable.");
}

const uploadData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(dbUrl); // Simplified connection without deprecated options
    console.log("Connected to MongoDB Atlas");

    console.log("Clearing existing data...");
    await Result.deleteMany({});
    console.log("Existing data cleared");

    console.log("Inserting new data...");
    const insertedData = await Result.insertMany(initData.data);
    console.log(`Successfully inserted ${insertedData.length} records`);

  } catch (error) {
    console.error("Error during upload:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

uploadData();
