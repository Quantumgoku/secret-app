import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./Usermodel.js";

dotenv.config();
const { JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy({ session: false }, (username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }

        const valid = user.verifyPassword(password);
        if (valid) {
          return done(null, user, {
            message: "Credentials verified successfully",
          });
        }
        return done(null, false, { message: "Invalid password" });
      })
      .catch((error) => {
        done(error, false, { message: "Internal error" });
      });
  })
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: (req) => req.cookies.token,
      jsonWebTokenOptions: {
        complete: true,
        ignoreExpiration: false,
      },
      // passReqToCallback: true,
    },
    ({ payload, header, signature }, done) => {
      // console.log({ payload, header, signature });
      return done(null, payload);
    }
  )
);

export default passport;
