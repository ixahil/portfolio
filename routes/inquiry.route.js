import express from "express";

import {
  createInquiry,
  getAllInquiries,
} from "../controllers/inquiries.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const inquiryRouter = express.Router();

//Public Route
inquiryRouter.post("/inquiry", createInquiry);

// Admin Route
inquiryRouter.get("/get-inquiry", getAllInquiries);

export default inquiryRouter;
