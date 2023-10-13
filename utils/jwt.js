import { configDotenv } from "dotenv";
import { redis } from "./redis.js";

configDotenv();

// Parse environment variables to integrate with fallback values
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE || "300";
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE || "1200";

// Options for cookies
export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "None",
  Domain: "localhost",
  Secure: true,
};
export const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "None",
  domain: "localhost",
  Secure: true,
};

export const sendToken = (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // Upload session to redis
  redis.set(user._id, JSON.stringify(user));

  // Only set secure to true in production

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Send the response with the specified status code
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};