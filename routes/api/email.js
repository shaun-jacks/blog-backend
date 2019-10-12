const express = require("express");
const router = express.Router();
const Email = require("../../models/email");
const Joi = require("@hapi/Joi");

// Create login form validation
const emailSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  name: Joi.string().required(),
  body: Joi.string().required()
});

router.post("/", async (req, res) => {
  let { name, email, body } = req.body;
  const { error } = emailSchema.validate({ name, email, body });
  console.log("/api/email");
  if (error) {
    console.log("error occurred", error);
    const errMsg = error.details[0].message;
    return res.status(401).send({ error: errMsg });
  }
  try {
    email = new Email({
      name,
      email,
      body
    });
    email = await email.save();
    console.log("SUCCESS /api/email");
    return res.status(200).json(email);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Error sending email." });
  }
});

module.exports = router;
