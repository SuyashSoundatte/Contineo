const ErrorHandler = (error, req, res, next) => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || "error";
  res.status(error.statuscode).json({
    status: error.statuscode,
    message: error.message,
  });
};

export default ErrorHandler;