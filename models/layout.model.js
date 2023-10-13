import mongoose, { Schema, model } from "mongoose";

const faqSchema = new Schema({
  question: String,
  answer: String,
});

const CategorySchema = new Schema({
  title: String,
});

const bannerImageSchema = new Schema({
  public_id: String,
  url: String,
});

const LayoutSchema = new Schema({
  type: { type: String },
  faq: [faqSchema],
  categories: [CategorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const LayoutModel = model("Layout", LayoutSchema);

export default LayoutModel;
