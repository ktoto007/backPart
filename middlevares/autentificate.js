const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { Secret_Key } = process.env;

const autentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!bearer) {
    next(HttpError(401));
  }

  try {
    const { userId } = jwt.verify(token, Secret_Key);

    const user = await User.findById(userId);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = autentificate;
