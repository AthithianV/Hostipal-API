import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"] || req.cookies.jwtToken;

  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }
  const payload = jwt.verify(token, process.env.SECRETKEY);
  req.username = payload.username;
  next();
};

export default authMiddleware;
