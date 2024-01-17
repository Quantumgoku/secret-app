import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { MONGO_URI } = process.env;

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URI, {})
      .then((m) => {
        resolve(m);
      })
      .catch((error) => reject(error));
  });
};

export default connect;
