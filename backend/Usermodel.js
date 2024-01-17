import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  secret_id: String,
});

userSchema.methods = {
  verifyPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
  hashPassword: function (password) {
    return bcrypt.hashSync(password, 10);
  },
};
userSchema.pre("save", function (next) {
  this.password = this.hashPassword(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
