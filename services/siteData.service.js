import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import siteDataModel from "../models/siteData.model.js";

// create siteData
export const createSiteInfo = catchAsyncErrors(async (data, res) => {
  const siteData = await siteDataModel.create(data);
  res.status(201).json({
    success: true,
    message: "New Data Created",
    siteData,
  });
});

// Get siteData
export const getSiteInfo = async (res) => {
  const siteData = await siteDataModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    siteData,
  });
};
