import { Router } from "express";
import passport from "./passport.js";
import dotenv from "dotenv";
import User from "./Usermodel.js";
import JWT from "jsonwebtoken";

dotenv.config();
const { JWT_SECRET } = process.env;

const router = Router();

router.route("/").all((req, res) => {
  passport.authenticate("jwt", { session: false }, (error, payload) => {
    if (payload) {
      return res.json({ username: payload.username });
    }
    return res.json({ error: "Not authenticated" });
  })(req, res);
});

router.route("/signin").post(
  (req, res, next) => {
    // console.log({ req });
    passport.authenticate("jwt", { session: false }, (err, payload) => {
      if (payload) {
        return res.json({
          error:
            "An account is already logged in, please log out and try again",
        });
      }
      next();
    })(req, res);
  },
  (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (!user) {
        return res.json({ err, info });
      }
      const payload = {
        _id: user._id,
        username: user.username,
      };
      req.login(payload, { session: false }, (error) => {
        if (error) {
          return res.json({ error });
        }
        const token = JWT.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
        res.json({ payload, success: true });
      });
    })(req, res);
  }
);

router.route("/signup").post(
  (req, res, next) => {
    passport.authenticate("jwt", (err, payload) => {
      if (payload) {
        return res.json({ error: "Need to sign out before signing up" });
      }
      next();
    })(req, res);
  },
  (req, res, next) => {
    const { username, email, password } = req.body;
    // TODO: validate the fields
    User.findOne({ username }).then((user) => {
      if (user) {
        return res.json({ error: "Username not available" });
      }
      User.findOne({ email }).then((user) => {
        if (user) {
          return res.json({ error: "Email is already registered" });
        }
        User.create(req.body).then((user) => {
          if (user) {
            return res.json({ success: true });
          }
          return res.json({ error: "Internal error, try again later" });
        });
      });
    });
  }
);

router.route("/signout").post((req, res) => {
  passport.authenticate("jwt", (err, payload) => {
    if (payload) {
      res.clearCookie("token");
      return res.json({ success: true });
    }
    return res.json({ error: "No user to logout" });
  })(req, res);
});

export default router;
