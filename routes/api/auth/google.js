const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    session: false
  }),
  async (req, res) => {
    const token = await req.user.generateAuthToken();
    res.send(token);
  }
);

module.exports = router;
