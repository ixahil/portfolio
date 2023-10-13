import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";

configDotenv();

const emailRegexPatter = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      validate: {
        validator: function (value) {
          return emailRegexPatter.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be atleast 6 characters!"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    roles: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    projects: [
      {
        project_id: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN || "",
    {
      expiresIn: "5m",
    }
  );
};

// Sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN || "",
    {
      expiresIn: "3d",
    }
  );
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
