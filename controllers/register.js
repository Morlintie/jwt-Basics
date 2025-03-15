const { BadRequestError } = require("../errors");

const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide the credentials");
  }

  const id = crypto.randomUUID();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "The user has been created", token: token });
};

const getRegister = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Welcome ${req.user.username}, your lucky number is ${luckyNumber}`,
    success: true,
  });
};

module.exports = {
  postRegister,
  getRegister,
};
