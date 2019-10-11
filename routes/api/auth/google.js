const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  (req, res, next) => {
    console.log("HERE");
    next();
  },
  passport.authenticate("google-token", {
    session: false
  }),
  async (req, res) => {
    const token = await req.user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .json({ success: true });
  }
);

module.exports = router;
