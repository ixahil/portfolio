import ProjectModel from "../models/projects.model.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";

// create projects
export const createProject = catchAsyncErrors(async (data, res) => {
  const project = await ProjectModel.create(data);
  res.status(201).json({
    success: true,
    project,
  });
});

// Get all projects

export const getAllProjectsServices = async (res) => {
  const projects = await ProjectModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    projects,
  });
};
