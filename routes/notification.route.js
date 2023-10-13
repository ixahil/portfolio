import express from "express";
import {
  getNotification,
  updateNotification,
} from "../controllers/notification.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const notificationRouter = express.Router();

// Admin Route

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotification
);
notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRouter;
