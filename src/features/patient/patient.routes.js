import express from "express";
import {
  createReport,
  getAllReports,
  getReportsWithStatus,
  register,
} from "./patient.controller.js";

const PatientRouter = express();

PatientRouter.post("/register", register);
PatientRouter.post("/:patientId/create_report", createReport);
PatientRouter.get("/:patientId/all_reports", getAllReports);
PatientRouter.get("/reports/:status", getReportsWithStatus);
