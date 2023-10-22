import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import InquiriesModel from "../models/inquiries.model.js";
import ejs from "ejs";
import NotificationModel from "../models/notification.model.js";
import sendMail from "../utils/sendMail.js";
import path from "path";
import { URL } from "url";
import {
  deleteInquiryServices,
  getAllInquiriesServices,
  updateInquiryStatusServices,
} from "../services/inquiry.service.js";

const __dirname = new URL(".", import.meta.url).pathname;

// Create Inquiry - User Inquiry

export const createInquiry = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;

  try {
    const inquiry = await InquiriesModel.create(data);

    const mailData = {
      inquiry: {
        _id: inquiry._id.toString().slice(0, 6),
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };

    try {
      await sendMail({
        email: inquiry.email,
        subject: "Inquiry Confirmation",
        template: "inquiryMail.ejs",
        data: mailData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    await NotificationModel.create({
      title: "New Inquiry",
      message:
        "You have a new Inquiry from " + inquiry.email + " | " + inquiry.name,
    });

    res.status(201).json({
      success: true,
      Inquiry: inquiry,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all Inquiries -- Admin
export const getAllInquiries = catchAsyncErrors(async (req, res, next) => {
  try {
    getAllInquiriesServices(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const updateInquiryStatus = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;
  try {
    updateInquiryStatusServices(id, status, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const deleteInquiry = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  try {
    deleteInquiryServices(id, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
