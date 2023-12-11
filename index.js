import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
// http://localhost:3002
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

async function start() {
  try {
    await mongoose.connect(DB_URL);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
