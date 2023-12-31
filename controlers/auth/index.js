const { ctrlWrapper } = require("../../helpers");
const login = require("./login");
const register = require("./register");
const updateUser = require("./updateUser");
const current = require("./current");
const logout = require("./logout");

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  updateUser: ctrlWrapper(updateUser),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
