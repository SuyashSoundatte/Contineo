const ErrorHandler = (error, req, res, next) => {
  error.statuscode = error.statuscode || 590;
  error.status = error.status || "error";
  res.status(error.statuscode).json({
    status: error.statuscode,
    message: error.message,
    stack: error.stack,
  });
};

export default ErrorHandler;