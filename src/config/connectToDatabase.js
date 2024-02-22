import mongoose from "mongoose";

// Function for connecting to mongoDB
const connectToMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
