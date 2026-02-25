const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {

      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // attach user
      req.user = decoded;
      return next();

    } catch (err) {
      const error = new Error("Not authorized, token failed");
      error.statusCode = 401;
      return next(error);
    }
  }

  const error = new Error("Not authorized, no token");
  error.statusCode = 401;
  return next(error);
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error("Not allowed");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};

module.exports = {protect, authorize};