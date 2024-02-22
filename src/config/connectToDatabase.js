import mongoose from "mongoose";

const password = encodeURIComponent("AQ!SW@de3fr4");
const url = `mongodb+srv://Athithian:${password}@cluster0.jbnemwi.mongodb.net/CSV_UPLOAD`;

// Function for connecting to mongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
