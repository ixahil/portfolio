import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import InquiriesModel from "../models/inquiries.model.js";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";

// Inquiries Analytics -- Admin
export const getInquiryAnalytics = catchAsyncErrors(async (req, res, next) => {
  try {
    const inquiries = await generateLast12MonthsData(InquiriesModel);

    res.status(200).json({
      success: true,
      inquiries,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
