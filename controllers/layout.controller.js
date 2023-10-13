import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import LayoutModel from "../models/layout.model.js";
import cloudinary from "cloudinary";

export const createLayout = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type } = req.body;

    const isTypeExist = await LayoutModel.findOne({ type });
    if (isTypeExist) {
      return next(new ErrorHandler(`${type} already exist`, 400));
    }

    if (type) {
      switch (type) {
        case "Banner":
          // code block
          const { image, title, subTitle } = req.body;

          const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

          const banner = {
            image: {
              public_id: myCloud.public_id,
              imageURL: myCloud.secure_url,
            },
            title,
            subTitle,
          };

          await LayoutModel.create(banner);
          break;
        case "FAQ":
          // code block
          const { faq } = req.body;

          const faqItems = await Promise.all(
            faq.map(async (item) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );

          await LayoutModel.create({ type: "FAQ", faq: faqItems });

          break;
        case "Categories":
          // code block
          const { categories } = req.body;

          const categoriesItems = await Promise.all(
            categories.map(async (item) => {
              return {
                title: item.title,
              };
            })
          );

          await LayoutModel.create({
            type: "Categories",
            categories: categoriesItems,
          });

          break;
        default:
        // code block
      }
      res
        .status(201)
        .json({ success: true, message: "Layout Created Sucessfull!" });
    } else {
      return next(new ErrorHandler("Type is invalid", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Edit Layout

export const editLayout = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type } = req.body;
    if (type) {
      switch (type) {
        case "Banner":
          // code block
          const bannerData = await LayoutModel.findOne({ type: "Banner" });
          const { image, title, subTitle } = req.body;
          if (bannerData) {
            await cloudinary.v2.uploader.destroy(bannerData?.image.public_id);
          }

          const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

          const banner = {
            image: {
              public_id: myCloud.public_id,
              imageURL: myCloud.secure_url,
            },
            title,
            subTitle,
          };

          await LayoutModel.findByIdAndUpdate(bannerData.id, { banner });
          break;
        case "FAQ":
          // code block
          const { faq } = req.body;
          const faqItem = await LayoutModel.findOne({ type: "FAQ" });
          const faqItems = await Promise.all(
            faq.map(async (item) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );

          await LayoutModel.findByIdAndUpdate(faqItem?._id, {
            type: "FAQ",
            faq: faqItems,
          });

          break;
        case "Categories":
          // code block
          const { categories } = req.body;
          const categoryItem = await LayoutModel.findOne({
            type: "Categories",
          });

          const categoriesItems = await Promise.all(
            categories.map(async (item) => {
              return {
                title: item.title,
              };
            })
          );

          await LayoutModel.findByIdAndUpdate(categoryItem?._id, {
            type: "Categories",
            categories: categoriesItems,
          });

          break;
        default:
        // code block
      }
      res
        .status(201)
        .json({ success: true, message: "Layout Updated Sucessfull!" });
    } else {
      return next(new ErrorHandler("Type is invalid", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get layout by type
export const getLayoutByType = catchAsyncErrors(async (req, res, next) => {
  try {
    const { type } = req.body;
    const layout = await LayoutModel.findOne({ type });
    res.status(201).json({
      sucess: true,
      layout,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
