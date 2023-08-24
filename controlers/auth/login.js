const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const { Secret_Key } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ userId: user._id }, Secret_Key, { expiresIn: "1d" });

  user.token = token;
  await user.save();

  res.json({
    token,
    user: {
      avatar: user.avatar,
      email: user.email,
      name: user.name,
    },
  });
};

module.exports = login;
