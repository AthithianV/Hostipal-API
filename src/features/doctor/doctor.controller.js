import { findDoctor, registerRepo } from "./doctor.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationError from "../../middlewares/ErrorHandler.js";

// Creates document for new Doctor
export const register = async (req, res, next) => {
  try {
    const { username, password, gender, specilization } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const doctor = await registerRepo({
      username,
      password: hashedPassword,
      gender,
      specilization,
    });
    res.status(200).json({
      success: true,
      message: "Doctor Registered Successfull",
      Doctor_Details: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the doctor
    const doctor = await findDoctor(username);

    // if doctor not exists, send error
    if (!doctor) {
      throw new ApplicationError("Username Not found", 400);
    }

    // Compare passwaord, throw error for wrong password
    const verify = await bcrypt.compare(password, doctor.password);
    if (!verify) {
      throw new ApplicationError("Incorrect Password", 400);
    }

    // Create a token which expires in 5h
    const token = jwt.sign(
      { doctorname: doctor.username, doctorId: doctor._id },
      process.env.SECRETKEY,
      { expiresIn: "5h" }
    );

    // Send token and set token in cookies
    res
      .status(200)
      .cookie("jwtToken", token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
      .json({
        success: true,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};
