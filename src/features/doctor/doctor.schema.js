import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validation: (value) => {
        return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
      },
      message:
        "Password should contains atleast 8 character, must including one uppercase, one lowercase and one special character",
    },
  },
  gender: { type: String, enum: ["MALE", "FEMALE"] },
  specilization: { type: String },
});

const DoctorModel = mongoose.model("doctor", DoctorSchema);
export default DoctorModel;
