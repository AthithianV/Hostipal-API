import PatientModel from "./patient.schema.js";
import ReportModel from "./report.schema.js";

export const registerRepo = async (data) => {
  try {
    // Find patient by phone no
    const foundPatient = await PatientModel.find({
      phone_no: data.phone_no,
    });

    // If patient Exist return the patinet
    if (foundPatient) {
      return { message: "Patient already Exists", patient: foundPatient };
    }

    // Create new patient document
    const newPatient = new PatientModel(data);
    await newPatient.save();
    return { message: "Patient Registration Successful", patient: newPatient };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createReportRepo = async (data) => {
  try {
    // Create new report.
    const newReport = new ReportModel(data);
    await newReport.save();

    // update reports array in document of the patient
    const patient = await PatientModel.findById(data.patientId);
    patient.reports.push(newReport._id);

    return newReport;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllReportsRepo = async (patientId) => {
  try {
    // Get all reports with given patient Id, the reports and patient name for the is selected.
    const allReport = await PatientModel.findById(patientId)
      .select("reports patient_name")
      .populate("report");
    return allReport;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportsWithStatusRepo = async (status) => {
  try {
    // Get all report based on the status.
    const reports = await ReportModel.find({ status });
    return reports;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
