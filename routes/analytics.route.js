import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { getInquiryAnalytics } from "../controllers/analytics.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-inquiry-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getInquiryAnalytics
);

export default analyticsRouter;
