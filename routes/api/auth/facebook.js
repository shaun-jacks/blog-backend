const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  (req, res, next) => {
    console.log("HERE");
    next();
  },
  passport.authenticate("facebook", { scope: ["email"], session: false })
);

router.get(
  "/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
    sucessRedirect: "/"
  }),
  async (req, res) => {
    const token = await req.user.generateAuthToken();
    return res.header("x-auth-token", token).redirect("http://localhost:8000");
  }
);

module.exports = router;
