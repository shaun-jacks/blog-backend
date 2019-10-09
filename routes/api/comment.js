const express = require("express");
const router = express.Router();
const { authorizeRoute } = require("../../middleware/auth");
const Comment = require("../../models/Comment");

router.post("/:slug", authorizeRoute, async (req, res) => {
  const { name, id } = req.user;
  const { slug } = req.params;
  const { body } = req.body;
  let comment = new Comment({
    name,
    userId: id,
    slug,
    body
  });
  comment = await comment.save();
  return res.status(200).send("Successful Comment!");
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  let comments = await Comment.find({
    slug
  }).exec();
  return res.status(200).json(comments);
});

module.exports = router;
