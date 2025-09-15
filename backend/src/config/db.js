import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to MONGODB");
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
  }
};
