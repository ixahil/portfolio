import NotificationModel from "../models/notification.model.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  getAllNotificationService,
  updateNotificationService,
} from "../services/notification.service.js";

// Get all notifications -- Only admin
export const getNotification = catchAsyncErrors(async (req, res, next) => {
  try {
    getAllNotificationService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update Notification Status -- Admin
export const updateNotification = catchAsyncErrors(async (req, res, next) => {
  try {
    updateNotificationService(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
