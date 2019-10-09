const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: [true, "Must have email"]
    },
    name: { type: String, default: "" },
    facebook: {
      id: { type: String, default: "" },
      name: { type: String, default: "" },
      profileUrl: { type: String, required: [true, "Must have photo url"] }
    },
    google: {
      id: { type: String, default: "" },
      name: { type: String, default: "" }
    },
    isRegistered: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.generateAuthToken = async function() {
  const token = await jwt.sign(
    {
      id: this._id,
      name: this.name
    },
    process.env.secret,
    {
      expiresIn: "12h"
    }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
