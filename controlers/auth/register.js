const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const { Secret_Key } = process.env;

const register = async (req, res) => {
  const body = req.body;

  const { email, password } = body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar =
    "https://res.cloudinary.com/dhsgllsgh/image/upload/v1693246509/default_for_new_user.png";

  const newUser = await User.create({
    ...body,
    password: hashPassword,
    avatar,
  });

  const token = jwt.sign({ userId: newUser._id }, Secret_Key, {
    expiresIn: "1d",
  });

  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    user: {
      avatar,
      email: newUser.email,
      name: newUser.name,
      id: newUser._id,
    },
    token,
  });
};

module.exports = register;
