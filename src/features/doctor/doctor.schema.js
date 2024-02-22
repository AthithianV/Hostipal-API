import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  gender: { type: String, enum: ["MALE", "FEMALE"] },
  specilization: { type: String },
});

const DoctorModel = mongoose.model("doctor", DoctorSchema);
export default DoctorModel;
