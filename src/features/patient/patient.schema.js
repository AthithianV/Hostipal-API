import mongoose from "mongoose";

// Patient Schema contain name, phone no, gender and reports of patient.
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
      message: "Invalid Mobile Number",
    },
  },
  gender: { type: String, enum: ["MALE", "FEMALE"] },
  reports: [{ type: mongoose.Types.ObjectId, ref: "report" }],
});

// Creates a model with PatientSchema
const PatientModel = mongoose.model("patient", PatientSchema);

// Export patient model.
export default PatientModel;
