const express = require("express");
const app = express();
const config = require("./config/config");
const mongoConnect = require("./models/index");
const passport = require("passport");
const helmet = require("helmet");
require("./config/auth/facebook");
require("./config/auth/google");

// auth routes
const authFacebook = require("./routes/api/auth/facebook");
const authGoogle = require("./routes/api/auth/google");

// Comment route
const comments = require("./routes/api/comment");

// Initialize db connection
const connection = mongoConnect();
connection
  .on("error", console.log)
  .on("disconnected", mongoConnect)
  .once("open", async () => {
    const PORT = config.http.port || "3000";
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Add helmet
app.use(helmet());

// Authentication routes
app.use("/api/auth/facebook", authFacebook);
app.use("/api/auth/google", authGoogle);

// Comment routes
app.use("/api/comment", comments);

app.get("/", (req, res) => {
  return res.status(200).send("Hello!");
});
