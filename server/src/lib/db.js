import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://akshay:12345@cluster0.w7acr9q.mongodb.net/");
    console.log("DB connected")
  } catch (error) {
    console.log(error);
  }
};