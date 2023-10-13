import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { configDotenv } from "dotenv";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import path from "path";
import { URL } from "url";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";
import { redis } from "../utils/redis.js";
import { getUserById } from "../services/user.service.js";
import cloudinary from "cloudinary";

const __dirname = new URL(".", import.meta.url).pathname;

configDotenv();

// Register User
export const registrationUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email is already exist", 400));
    }

    const user = {
      name,
      email,
      password,
    };

    console.log(process.cwd());
    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        template:
          "C:\\Users\\sahil\\Desktop\\full-stack-portfolio\\server\\mails\\activationMail.ejs",
        data,
      });

      res.status(200).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "5m" }
  );
  return { token, activationCode };
};

// activate user

export const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid Activation Code", 400));
    }

    const { name, email, password } = newUser.user;
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login User
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 401));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Please enter email and password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Please enter email and password", 401));
    }
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Logout User
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log(res.body);
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    redis.del(req.user._id);
    res.status(200).json({
      success: true,
      message: "Logout Successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token

export const updateAccessToken = catchAsyncErrors(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const message = "could not refresh token!";

    if (!decoded) {
      return next(new ErrorHandler(message, 404));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(
        new ErrorHandler("Please Login for access this resources!", 404)
      );
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 days seconds

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Get user info

export const getUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    getUserById(userId, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Social auth
export const socialAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = await userModel.create({ email, name, avatar });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update user Info

export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler(error.message, 400));
      }
      user.email = email;
    }
    if (name && user) {
      user.name = name;
    }

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update Password

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter your passwords", 400));
    }

    const user = await userModel.findById(req.user?._id).select("+password");

    if (user.password === undefined) {
      return next(new ErrorHandler("invalid User", 400));
    }

    const isPasswordMatch = await user.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Old Password", 400));
    }

    user.password = newPassword;

    await user.save();

    await redis.set(req.user?.id, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Update profile picture

export const updateProfilePicture = catchAsyncErrors(async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const userId = req.user?._id;

    const user = await userModel.findById(userId);

    if (avatar && user) {
      //if we have one avatar then call this if
      if (user?.avatar?.public_id) {
        // first delete old image
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
