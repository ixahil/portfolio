import InquiriesModel from "../models/inquiries.model.js";

// Get all Inquiries -- Admin
export const getAllInquiriesServices = async (res) => {
  const inquiries = await InquiriesModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    inquiries,
  });
};
