import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Project Title"],
    },
    description: {
      type: String,
    },
    htmlDescription: {
      type: String,
    },
    images: [
      {
        public_id: String,
        imageURL: String, // URL or file path to the image
      },
    ],
    thumbnail: {
      public_id: String,
      imageURL: String, // URL or file path to the image
    },
    selectedTech: [],
    status: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Projects", projectSchema);

export default ProjectModel;
