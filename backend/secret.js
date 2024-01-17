import { Router } from "express";
import Secret from "./SecretModel.js";
import passport from "./passport.js";
const router = Router();

router
  .route("/all")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    Secret.find()
      .then((secrets) => {
        res.json({ secrets });
      })
      .catch((error) => {
        console.log({ error });
        res.json({ error: "Unable to fetch secrets" });
      });
  });

router
  .route("/:username")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    const { username } = req.params;
    Secret.findOne({ username })
      .then((secret) => {
        res.json({ secret });
      })
      .catch((error) => {
        console.log({ error });
        res.json({ error: "Unable to get secret" });
      });
  });

router
  .route("/add")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    Secret.create(req.body)
      .then((secret) => {
        res.json({ success: true, secret });
      })
      .catch((error) => {
        console.log({ error });
        res.json({ error: "Unable to publish secret" });
      });
  });

export default router;
