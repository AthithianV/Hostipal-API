import express from "express";
import { login, register } from "./doctor.controller.js";

const DoctorRouter = express();

DoctorRouter.post("/register", register);
DoctorRouter.post("/login", login);

export default DoctorRouter;
