import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  createProject,
  getAllProjectsServices,
} from "../services/projects.service.js";
import ProjectModel from "../models/projects.model.js";
import { redis } from "../utils/redis.js";

// upload projects
// export const uploadProject = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const data = req.body;

//     console.log(data.images);
//     if (data.images) {
//       const myCloud = await cloudinary.v2.uploader.upload(images.imageURL, {
//         folder: "projects",
//       });
//       data.images = [
//         {
//           public_id: myCloud.public_id,
//           imageURL: myCloud.secure_url,
//         },
//       ];
//     }

//     createProject(data, res, next);
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// upload/add projects
export const uploadProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    if (data.images && data.images.length > 0) {
      const uploadedImages = [];

      for (const image of data.images) {
        const myCloud = await cloudinary.v2.uploader.upload(image.data_url, {
          folder: "projects",
        });

        uploadedImages.push({
          public_id: myCloud.public_id,
          imageURL: myCloud.secure_url,
        });
      }
      data.images = uploadedImages;
      const { public_id, imageURL } = data.images[0];
      data.thumbnail = { public_id, imageURL };
    }

    data.thumbnail = {
      imageURL: "",
      public_id: "",
    };

    createProject(data, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Edit Projects
export const editProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const projectId = req.params.id; // Assuming you can get the project ID from the URL or request parameters
    const data = req.body;

    // Fetch the existing project data from the database
    const existingProject = await ProjectModel.findById(projectId);

    if (!existingProject) {
      return next(new ErrorHandler("Project not found", 404));
    }

    // Calculate which images are deleted
    const deletedImages = existingProject.images.filter((existingImage) => {
      return !data.images.some(
        (newImage) => newImage.public_id === existingImage.public_id
      );
    });
    // Delete only the images that were removed
    for (const deletedImage of deletedImages) {
      await cloudinary.v2.uploader.destroy(deletedImage.public_id);
    }

    // Handle image updates (if any)
    if (data.images && data.images.length > 0) {
      const uploadedImages = [];

      for (const image of data.images) {
        // Upload new images if needed
        if (!image.public_id) {
          const myCloud = await cloudinary.v2.uploader.upload(image.data_url, {
            folder: "projects/" + data.title,
          });

          uploadedImages.push({
            public_id: myCloud.public_id,
            imageURL: myCloud.secure_url,
          });
        } else {
          // Keep existing images
          uploadedImages.push(image);
        }
      }

      // Update the existing project's images with the new uploaded images
      data.images = uploadedImages;
    }

    // Use findByIdAndUpdate to update the project by its ID
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $set: data, // Update other project fields as needed
      },
      {
        new: true,
      }
    );

    // Send a response indicating success
    res.status(201).json({ success: true, data: updatedProject });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all projects
export const getProjects = catchAsyncErrors(async (req, res, next) => {
  try {
    // const isCacheExist = await redis.get("allProjects");
    const projects = await ProjectModel.find();

    if (projects) {
      res.status(200).json({
        success: true,
        projects,
      });
    } else {
      console.log("spmething wrong...");
    }

    // if (isCacheExist) {
    //   const project = JSON.parse(isCacheExist);

    //   res.status(200).json({
    //     success: true,
    //     project,
    //   });
    // } else {
    //   const projects = await ProjectModel.find();

    //   await redis.set("allProjects", JSON.stringify(projects));

    //   // Send the list of projects as a JSON response
    //   res.status(200).json({ success: true, data: projects });
    // }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get single project

export const getAProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const { _doc } = await ProjectModel.findById(req.params.id);

    if (!_doc) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const { createdDate } = _doc;

    const newDate = createdDate.toISOString().substring(0, 10);

    _doc.createdDate = newDate;

    // Send the project data as a JSON response
    res.status(200).json({ success: true, data: _doc });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all projects -- Admin

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  try {
    getAllProjectsServices(res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Delete Project Admin

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const projectId = req.params.id;

    // Use Mongoose to find and remove the project by its ID
    const project = await ProjectModel.findByIdAndRemove(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
