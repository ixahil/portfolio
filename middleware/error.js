import ErrorHandler from "../utils/ErrorHandler.js";

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDb ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
    return next(err);
  }

  // Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
    return next(err);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, try again`;
    err = new ErrorHandler(message, 400);
    return next(err);
  }

  // JWT expire erro
  if (err.name === "TokenExpiredError") {
    const message = `Jsown Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
    return next(err);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
