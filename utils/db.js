import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const dbURI = process.env.DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI).then((data) => {
      console.log(
        "database connected successfully with " + data.connection.host
      );
    });
  } catch (error) {
    console.log(error);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
