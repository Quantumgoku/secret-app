import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./auth.js";
import secretRouter from "./secret.js";

dotenv.config();
const { PORT, MONGO_URI } = process.env;

const app = express();

mongoose
  .connect(MONGO_URI, {})
  .then((db) => {
    console.log("MongoDB connected");
    app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
    app.use(cookieParser());
    app.use(express.json());
    app.use("/auth", authRoute);
    app.use("/secrets", secretRouter);
    app.use((req, res) => {
      res.json({ message: "Welcome to backend" });
    });
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Not connected to DB");
  });

export default app;