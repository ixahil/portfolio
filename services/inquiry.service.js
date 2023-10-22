import InquiriesModel from "../models/inquiries.model.js";

// Get all Inquiries -- Admin
export const getAllInquiriesServices = async (res) => {
  const inquiries = await InquiriesModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    inquiries,
  });
};

export const updateInquiryStatusServices = async (id, status, res) => {
  try {
    const update = { status: status ? true : false };
    const inquiry = await InquiriesModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!inquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry marked as ${status ? "read" : "unread"}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error updating inquiry status" });
  }
};

export const deleteInquiryServices = async (id, res) => {
  try {
    // Use Mongoose to find and remove the project by its ID
    const project = await InquiriesModel.findByIdAndRemove(id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Inquiry not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
