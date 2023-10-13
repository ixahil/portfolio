import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  deleteProject,
  editProject,
  getAProject,
  getAllProjects,
  getProjects,
  uploadProject,
} from "../controllers/projects.controller.js";

const projectsRouter = express.Router();

// Public Route
projectsRouter.get("/projects", getProjects);

projectsRouter.get("/projects/:id", getAProject);

// Admin Routes
projectsRouter.post(
  "/create-project",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadProject
);

projectsRouter.put(
  "/edit-project/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editProject
);

projectsRouter.get(
  "/get-projects",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllProjects
);

projectsRouter.delete(
  "/delete-project/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteProject
);

export default projectsRouter;
