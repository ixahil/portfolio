import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller.js";

const layoutRouter = express.Router();

// Public Route
layoutRouter.get("/get-layout", getLayoutByType);

// Admin Route
layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

export default layoutRouter;
