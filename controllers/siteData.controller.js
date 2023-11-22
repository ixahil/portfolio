import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import siteDataModel from "../models/siteData.model.js";
import { createSiteInfo } from "../services/siteData.service.js";
import streamifier from "streamifier";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Assuming a parameter named 'name' is passed in the request
    const path = req.body.name.replace(" ", "");
    const destinationDirectory = `public/${path}/resume/`;

    // Ensure the destination directory exists
    fs.mkdirSync(destinationDirectory, { recursive: true });
    cb(null, destinationDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

export const newHandler = async (req, res, next) => {
  try {
    const data = req.body; // This will contain non-file fields
    const file = req.file; // This will contain the file information

    if (file) {
      // Update the 'resume' field in the 'data' object with the file path
      data.resume = file.path; // The file path on your server
    }

    // Use findOneAndUpdate to update the project by its email
    const existingProject = await siteDataModel.findOneAndUpdate(
      { email: data.email },
      data,
      { new: true }
    );

    if (!existingProject) {
      // If the project with the given email doesn't exist, create a new one
      createSiteInfo(data, res);
      return;
    }

    // If the project already exists, you might want to send a response to indicate that
    return res.status(400).json({
      success: false,
      message: "Data Updated",
      data: existingProject,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

const handleSiteData = async (data, res, next, req) => {
  try {
    const file = req.body.file;
    console.log(req.body);

    // Check if a file is provided
    if (file) {
      // Upload the file to Cloudinary
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(file, {
        folder: "Site Data/files",
        resource_type: "auto",
      });

      // Get the Cloudinary URL for the uploaded file
      const public_id = cloudinaryResponse.public_id;
      const fileURL = cloudinaryResponse.secure_url;

      // Update the 'file' field in the 'data' object
      data.file.public_id = public_id;
      data.file.fileURL = fileURL;
    }

    // Use findOneAndUpdate to update the project by its email
    const existingProject = await siteDataModel.findOneAndUpdate(
      { email: data.email },
      data,
      { new: true }
    );

    if (!existingProject) {
      // If the project with the given email doesn't exist, create a new one
      createSiteInfo(data, res);
      return;
    }

    // If the project already exists, you might want to send a response to indicate that
    return res.status(400).json({
      success: false,
      message: "Data Updated",
      data: existingProject,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// New SiteData
export const createSiteData = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  await handleSiteData(data, res, next, req);
});

// Update Site Data
export const updateSiteData = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  await handleSiteData(data, res, next, req);
});

// Get Latest Site Data
export const getLatestSiteData = catchAsyncErrors(async (req, res, next) => {
  try {
    const siteData = await siteDataModel
      .findOne()
      .sort({ updatedAt: -1 }) // Assuming there's a field called createdDate
      .limit(1);

    if (!siteData) {
      // If no site data is found, you might want to handle this case
      return res
        .status(404)
        .json({ success: false, message: "Site data not found" });
    }

    // Send the latest site data as a response
    res.status(200).json({ success: true, data: siteData });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
