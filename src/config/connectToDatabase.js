import mongoose from "mongoose";

const url = process.env.DB_URL;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
