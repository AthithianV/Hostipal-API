import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "./logs/activites.log" }),
  ],
});

export const ErrorLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "./logs/error.log" })],
});

const LoggerMiddleware = (req, res, next) => {
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
