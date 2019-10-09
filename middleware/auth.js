const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authorizeRoute = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.token.secret);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(403).send("Invalid token.");
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, config.token.secret);
    next();
  } catch (ex) {
    return res.status(403).send("Invalid token.");
  }
};

module.exports = {
  authorizeRoute,
  verifyToken
};
