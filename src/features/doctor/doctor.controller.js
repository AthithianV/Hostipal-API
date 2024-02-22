import { findDoctor, registerRepo } from "./doctor.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationError from "../../middlewares/ErrorHandler.js";

export const register = async (req, res, next) => {
  try {
    const { username, password, gender, specilization } = req.body;
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
    throw error;
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const doctor = await findDoctor(username);
    if (!doctor) {
      throw new ApplicationError("Username Not found", 400);
    }

    const verify = bcrypt.compare(password, doctor.password);
    if (!verify) {
      throw new ApplicationError("Incorrect Password", 400);
    }

    const token = jwt.sign(
      { username: doctor.username },
      process.env.SECRETKEY,
      { expiresIn: "5h" }
    );

    res
      .status(200)
      .cookie("jwtToken", token, { maxAge: 5 * 60 * 60 * 1000, httpOnly: true })
      .json({
        success: true,
        message: "Doctor Registration Successful",
        token: token,
      });
  } catch (error) {
    throw error;
  }
};
