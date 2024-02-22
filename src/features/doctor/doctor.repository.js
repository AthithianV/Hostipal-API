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

export const findDoctor = async (username) => {
  try {
    return await DoctorModel.find({ username });
  } catch (error) {
    throw error;
  }
};
