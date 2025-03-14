const CustomAPIError = require("../errors/errors.js");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message, success: false });
  } else {
    res.status(500).json({ msg: "Something went wrong", success: false });
  }
};

module.exports = errorHandlerMiddleware;
