import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import ErrorMiddleware from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import projectsRouter from "./routes/projects.route.js";
import inquiryRouter from "./routes/inquiry.route.js";
import notificationRouter from "./routes/notification.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import layoutRouter from "./routes/layout.route.js";

configDotenv();

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ORIGIN;
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/public/", express.static("public"));

// routes
app.use(
  "/api/v1",
  userRouter,
  projectsRouter,
  inquiryRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

// testing route
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Unknown Routes
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

export default app;
