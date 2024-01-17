import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./auth.js";
import secretRouter from "./secret.js";

dotenv.config();
const { PORT, MONGO_URI, FRONTEND_URL } = process.env;

const app = express();
app.use(cors({ credentials: true, origin: FRONTEND_URL }));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/secrets", secretRouter);
app.use((req, res) => {
  res.json({ message: "Welcome to backend" });
});

mongoose
  .connect(MONGO_URI, {})
  .then((db) => {
    // console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Not connected to DB");
  });

export default app;