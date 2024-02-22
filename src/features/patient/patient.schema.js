import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
  patient_name: { type: String, required: true },
  phone_no: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validattion: (value) => {
        return value.length() == 10;
      },
      message: "Enter a valid Mobile Number",
    },
  },
});
