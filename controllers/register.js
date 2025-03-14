const CustomAPIError = require("../errors/errors.js");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("please provide the credentials", 400);
  }

  const id = crypto.randomUUID();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "The user has been created", token: token });
};

const getRegister = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("you are not authorized to this route", 401);
  }
  const token = authHeader.split(" ")[1];
  let data;
  try {
    data = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new CustomAPIError("The token has been expired", 401);
  }
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Welcome ${data.username}, your lucky number is ${luckyNumber}`,
    success: true,
  });
};

module.exports = {
  postRegister,
  getRegister,
};
