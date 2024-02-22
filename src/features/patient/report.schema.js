import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
  createdBy: { type: mongoose.Types.ObjectId, ref: "doctor", required: true },
  patient: { type: mongoose.Types.ObjectId, ref: "patient", required: true },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
  date: { type: Date, default: new Date() },
});

const ReportModel = mongoose.model("report", ReportSchema);
export default ReportModel;
