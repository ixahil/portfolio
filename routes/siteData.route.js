import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  createSiteData,
  getLatestSiteData,
  newHandler,
  upload,
} from "../controllers/siteData.controller.js";

const siteDataRouter = express.Router();

// Apply multer middleware in your route
siteDataRouter.put("/update-sitedata", upload.single("resume"), newHandler);

// public Routes
siteDataRouter.get("/get-sitedata", getLatestSiteData);

// Admin Routes
siteDataRouter.post(
  "/create-sitedata",
  isAuthenticated,
  authorizeRoles("admin"),
  createSiteData
);

// siteDataRouter.put(
//   "/update-sitedata",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   updateSiteData
// );

// projectsRouter.get(
//   "/get-projects",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   getAllProjects
// );

// projectsRouter.delete(
//   "/delete-project/:id",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   deleteProject
// );

export default siteDataRouter;
