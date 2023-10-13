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
    message: {
      type: String,
      required: [true, "enter your message/requirements"],
    },
  },
  { timestamps: true }
);

const InquiriesModel = mongoose.model("Inquiries", inquiriesSchema);

export default InquiriesModel;
