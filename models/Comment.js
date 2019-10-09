const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const likeScema = new Schema({
  userId: {
    type: String,
    default: "",
    required: [true]
  },
  name: {
    type: String,
    required: [true, "Must have name"]
  }
});

const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      default: "",
      required: [true]
    },
    name: {
      type: String,
      required: [true, "Must have name"]
    },
    slug: {
      type: String,
      required: [true, "Must have slug"]
    },
    body: {
      type: String,
      required: [true, "Must have text"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
