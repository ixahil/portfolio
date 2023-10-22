import express from "express";

import {
  createInquiry,
  deleteInquiry,
  getAllInquiries,
  updateInquiryStatus,
} from "../controllers/inquiries.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const inquiryRouter = express.Router();

//Public Route
inquiryRouter.post("/inquiry", createInquiry);

// Admin Route
inquiryRouter.get("/get-inquiry", getAllInquiries);

inquiryRouter.put("/update-inquiry/:id", updateInquiryStatus);

inquiryRouter.delete("/delete-inquiry/:id", deleteInquiry);

export default inquiryRouter;
