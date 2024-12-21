const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const token =
    req.cookies.access_token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Token is not valid!"));
    }

    req.user = user;
    next();
  });
};

module.exports = verifyToken;