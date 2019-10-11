const express = require("express");
const app = express();
const cors = require("cors");
const mongoConnect = require("./models/index");
const passport = require("passport");
const helmet = require("helmet");
require("dotenv").config();
require("./config/auth/facebook");
require("./config/auth/google");

var whitelist = [
  "http://localhost:8000",
  "http://localhost",
  "devshaun.netlify.com"
];
// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

var corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

// const corsOptions = {
//   credentials: true,
// };
// auth routes
const authFacebook = require("./routes/api/auth/facebook");
const authGoogle = require("./routes/api/auth/google");

// Comment routes
const comments = require("./routes/api/comment");

// Initialize db connection
const connection = mongoConnect();
connection
  .on("error", console.log)
  .on("disconnected", mongoConnect)
  .once("open", async () => {
    const PORT = process.env.PORT || "3000";
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(cors(corsOptions));
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
