import {
  createReportRepo,
  getAllReportsRepo,
  getReportsWithStatusRepo,
  registerRepo,
} from "./patient.repository.js";

// Register new patient
export const register = async (req, res, next) => {
  try {
    const { patient_name, phone_no, gender } = req.body;
    const patient = await registerRepo({ patient_name, phone_no, gender });
    res.status(201).json({
      success: true,
      patient_details: patient,
    });
  } catch (error) {
    throw error;
  }
};

// Create new report
export const createReport = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const createdBy = req.username;
    const date = new Date();
    const { status } = req.body;
    const report = await createReportRepo({
      patientId,
      createdBy,
      date,
      status,
    });
    res.status(201).json({
      success: true,
      message: "New Report for the Patient is Created",
      report_details: report,
    });
  } catch (error) {
    throw error;
  }
};

// Get all reports of the patient.
export const getAllReports = async (req, res, next) => {
  try {
    const patientId = req.params.id;
    const reports = await getAllReportsRepo(patientId);
    res.status(201).json({
      success: true,
      reports: reports,
    });
  } catch (error) {
    throw error;
  }
};

// Get all reports with given status.
export const getReportsWithStatus = async (req, res, next) => {
  try {
    const status = req.params.status;
    const reports = await getReportsWithStatusRepo(patientId);
    res.status(201).json({
      success: true,
      reports: reports,
    });
  } catch (error) {
    throw error;
  }
};
