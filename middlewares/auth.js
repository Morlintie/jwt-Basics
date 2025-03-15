const { AuthenticationError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer null")) {
    throw new AuthenticationError("you are not authorized for this route");
  }
  const token = authHeader.split(" ")[1];
  let data;
  try {
    data = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AuthenticationError("the token has been expired");
  }
  const { username, password } = data;
  req.user = { username: username, password: password };
  next();
};

module.exports = authenticationMiddleware;
