// Package Imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Internal Imports
import { ErrorHandler } from "./src/middlewares/ErrorHandler";
import LoggerMiddleware from "./src/middlewares/logger.middleware.js";
import connectToMongoDB from "./src/config/connectToDatabase.js";

// create server
const server = express();

server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use(LoggerMiddleware);

server.use("/api/doctor");
server.use("/api/patient");

server.use((req, res, next) => {
  res.status(400).send("API DOES NOT EXISTS FOR" + req.url);
});

server.use(ErrorHandler);

// Run server.
const port = process.env.PORT || 1000;
server.listen(port, () => {
  console.log("Server listens at port " + port);
  connectToMongoDB();
});
