import NotificationModel from "../models/notification.model.js";

// Get all notifications -- Admin
export const getAllNotificationService = async (res) => {
  const notifications = await NotificationModel.find().sort({
    createdAt: -1,
  });

  res.status(201).json({
    success: true,
    notifications,
  });
};

// Update Notifications -- Admin
export const updateNotificationService = async (res) => {
  const notification = await NotificationModel.findById(req.params.id);

  !notification
    ? next(new ErrorHandler(error.message, 404))
    : notification.status
    ? (notification.status = "read")
    : notification.status;

  await notification.save();

  const notifications = await NotificationModel.find().sort({
    createdAt: -1,
  });

  res.status(201).json({
    success: true,
    notifications,
  });
};
