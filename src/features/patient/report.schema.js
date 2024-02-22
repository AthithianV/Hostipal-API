import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
  createBy: { type: mongoose.Types.ObjectId, ref: "doctor" },
  patient: { type: mongoose.Types.ObjectId, ref: "patient" },
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled - Quarantine",
      "Symptoms - Quarantine",
      "Positive - Admit",
    ],
  },
  date: { type: Date, default: new Date() },
});

const ReportModel = mongoose.model("report", ReportSchema);
