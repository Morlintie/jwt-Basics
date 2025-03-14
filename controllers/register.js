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

module.exports = {
  postRegister,
};
