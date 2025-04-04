const ErrorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  const statuscode = err.statuscode || 500;

  res.status(statuscode).json({
    success: false,
    message: err.message || "Internal Server Error",
    status: err.status || "error",
    ...(isProd ? {} : { stack: err.stack }),
  });
};

export default ErrorHandler;
