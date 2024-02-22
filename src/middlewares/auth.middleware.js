import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from header or cookies
  const token = req.headers["authorization"] || req.cookies.jwtToken;

  // If token not exists send unauthorized message.
  if (!token) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }

  // Get payload and add it to request, if error occurs send unauthorized.
  try {
    const payload = jwt.verify(token, process.env.SECRETKEY);
    req.username = payload.username;
  } catch (error) {
    return res.status(400).json({ success: false, message: "Unauthorized" });
  }

  next();
};

export default authMiddleware;
