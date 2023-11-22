import mongoose, { Schema } from "mongoose";

const siteDataSchema = new Schema(
  {
    logo: {
      type: String, // Specify the type here
      required: [true, "Please provide logo Name"],
    },
    name: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    position: {
      type: String,
      required: [true, "Please enter your position"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    resume: {
      type: String,
    },
    git: {
      type: String,
      required: [true, "Please enter your GitHub"],
    },
    linkedin: {
      type: String,
      required: [true, "Please enter your LinkedIn"],
    },
    instagram: {
      type: String,
      required: [true, "Please enter your Instagram"],
    },
  },
  { timestamps: true }
);

const siteDataModel = mongoose.model("siteData", siteDataSchema);

export default siteDataModel;
