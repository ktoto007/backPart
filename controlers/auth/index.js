const { ctrlWrapper } = require("../../helpers");
const login = require("./login");
const register = require("./register");
const updateUser = require("./updateUser");
const getCurrent = require("./getCurrent");
const logout = require("./logout");

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  updateUser: ctrlWrapper(updateUser),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
