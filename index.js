// Package Imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Internal Imports
import { ErrorHandler } from "./src/middlewares/ErrorHandler.js";
import LoggerMiddleware from "./src/middlewares/logger.middleware.js";
import connectToMongoDB from "./src/config/connectToDatabase.js";
import DoctorRouter from "./src/features/doctor/doctor.routes.js";
import PatientRouter from "./src/features/patient/patient.routes.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";

// create server
const server = express();

server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use(LoggerMiddleware);

// Redirect to Specific paths.
server.get("/", (req, res, next) => {
  res.status(200).send("Welcome to Hospital API");
});
server.use("/doctors/", DoctorRouter);
server.use("/patients/", authMiddleware, PatientRouter);
server.use("/reports/", authMiddleware, PatientRouter);

// Handle for unknow req url.
server.use((req, res, next) => {
  res.status(400).send("API DOES NOT EXISTS FOR " + req.url);
});

// Error Handling
server.use(ErrorHandler);

// Run server.
const port = process.env.PORT || 10000;

server.listen(port, () => {
  console.log("Server listens at port " + port);
  connectToMongoDB();
});
