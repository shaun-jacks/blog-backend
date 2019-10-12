const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

const EmailSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      required: [true]
    },
    email: {
      type: String,
      required: [true, "Must have email"]
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

module.exports = mongoose.model("Email", EmailSchema);
