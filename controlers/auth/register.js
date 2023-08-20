const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");

const { Secret_Key } = process.env;

const register = async (req, res) => {
  const body = req.body;

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...body, password: hashPassword });
  const token = jwt.sign({ userId: newUser._id }, Secret_Key, {
    expiresIn: "1d",
  });
  newUser.token = token;
  await newUser.save();

  res.status(201).json({ email: newUser.email, token });
};

module.exports = register;
