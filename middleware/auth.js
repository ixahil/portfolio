import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { redis } from "../utils/redis.js";
configDotenv();

// Authenticate a user
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const _auth = req.cookies.access_token;

  if (!_auth) {
    return next(new ErrorHandler("Please Login to Access", 400));
  }

  const decoded = jwt.verify(
    _auth,
    process.env.ACCESS_TOKEN,
    (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("You are not Authorized!", 400));
      }
      // if (!decoded) {
      //   return next(new ErrorHandler("Access token not valid", 400));
      // }
      if (decoded) {
        return decoded;
      } else {
        console.log("something wrong with jwt verification");
      }
    }
  );

  const user = await redis.get(decoded.id);

  if (!user) {
    return next(new ErrorHandler("Please Login to access this resource!", 400));
  }

  req.user = JSON.parse(user);
  next();
});

// Validate user Role

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.roles} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Check Auth
// Authenticate a user
export const checkAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;

    if (!access_token) {
      return next(new ErrorHandler("Please Login to Access", 400));
    }

    jwt.verify(access_token, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("Access token not valid", 401));
      }

      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler("Please Login to access this resource!", 400)
        );
      }

      req.user = JSON.parse(user);

      res.status(200).json({
        success: true,
        user: req.user,
        accessToken: access_token,
      });
    });
  } catch (error) {
    console.log(error);
  }
});
