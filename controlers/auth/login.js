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
  const id = user._id;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, Secret_Key, { expiresIn: "1d" });

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
