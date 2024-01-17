import mongoose from "mongoose";
import { randomName } from "./name.js";
const secretSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  message: String,
  randomName: {
    type: String,
    default: "Anonymous",
  },
});

secretSchema.pre("save", async function (next) {
  const name = await randomName();
  console.log({ name });
  if (name) {
    this.randomName = name;
  }
  next();
});

const Secret = mongoose.model("Secret", secretSchema);

export default Secret;
