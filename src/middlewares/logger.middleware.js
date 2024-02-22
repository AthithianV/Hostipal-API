import winston from "winston";

// Logger for info
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "./logs/activites.log" }),
  ],
});

// Logger for error
export const ErrorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "./logs/error.log" })],
});

const LoggerMiddleware = (req, res, next) => {
  // Check if url contains "login", prevent logging of personal data.
  if (!req.url.includes("login")) {
    const logData = `Request URL: ${req.url}, Log Data: ${JSON.stringify(
      req,
      body
    )}`;
    logger.info(logData);
  }
  next();
};

export default LoggerMiddleware;
