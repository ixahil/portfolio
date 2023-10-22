import mongoose, { Schema } from "mongoose";

const inquiriesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
    },
    email: {
      type: String,
      required: [true, "please provide your email"],
    },
    subject: {
      type: String,
      required: [true, "please provide your subject"],
    },
    message: {
      type: String,
      required: [true, "enter your message/requirements"],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const InquiriesModel = mongoose.model("Inquiries", inquiriesSchema);

export default InquiriesModel;
