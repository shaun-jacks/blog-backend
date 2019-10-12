const express = require("express");
const router = express.Router();
const { authorizeRoute } = require("../../middleware/auth");
const Comment = require("../../models/Comment");

// Create comment validation
const commentSchema = Joi.object().keys({
  slug: Joi.string().required(),
  body: Joi.string().required()
});

router.post("/:slug", authorizeRoute, async (req, res) => {
  console.log("POST /api/comment/:slug");
  const { name, id } = req.user;
  const { slug } = req.params;
  const { body } = req.body;
  const { error } = commentSchema.validate({ slug, body });
  if (error) {
    console.log("error occurred", error);
    const errMsg = error.details[0].message;
    return res.status(401).send({ error: errMsg });
  }
  console.log(slug);
  console.log(body);
  let comment = new Comment({
    name,
    userId: id,
    slug,
    body
  });
  comment = await comment.save();
  console.log("SUCCESS");
  console.log(comment);
  return res.status(200).json(comment);
});

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  console.log("GET /api/comment/:slug");

  const { error } = Joi.object()
    .keys({
      slug: Joi.string().required()
    })
    .validate({ slug });
  if (error) {
    console.log("error occurred", error);
    const errMsg = error.details[0].message;
    return res.status(401).send({ error: errMsg });
  }

  let comments = await Comment.find({
    slug
  })
    .sort("field -updatedAt")
    .exec();
  console.log("SUCCESS");
  console.log(comments);
  return res.status(200).json(comments);
});

module.exports = router;
