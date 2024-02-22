// ApplicationError class for throw custom error.
export default class ApplicationError extends Error {
  constructor(msg, code) {
    super();
    this.msg = msg;
    this.code = code;
  }
}

// Error handler to handle error.
export const ErrorHandler = (err, req, res, next) => {
  console.log(err);

  // Check if the error is of type ApplicationError, then send msg acoordingly.
  if (err instanceof ApplicationError) {
    return res.status(err.code).send({ success: false, message: err.msg });
  }

  // Check if error code is 11000, then it is duplicate Email error.
  if (err.code == 11000) {
    return res
      .status(400)
      .json({ success: false, message: "User Already Exists" });
  }

  // For all other error send oops msg
  res
    .status(500)
    .send({ success: false, message: "Oops, Something Went wrong" });
};
