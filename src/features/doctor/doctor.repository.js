import ApplicationError from "../../middlewares/ErrorHandler.js";
import DoctorModel from "./doctor.schema.js";

// Create new document for doctor in database
export const registerRepo = async (data) => {
  try {
    const newDoctor = new DoctorModel(data);
    await newDoctor.save();
  } catch (error) {
    throw error;
  }
};

// Find doctor by usernaem
export const findDoctor = async (username) => {
  try {
    return await DoctorModel.findOne({ username });
  } catch (error) {
    throw error;
  }
};
