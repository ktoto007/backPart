const { ctrlWrapper } = require("../../helpers");
const login = require("./login");
const refresh = require("./refresh");
const register = require("./register");
const updateUser = require("./updateUser");
const getCurrent = require("./getCurrent");
const logout = require("./logout");

module.exports = {
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  register: ctrlWrapper(register),
  updateUser: ctrlWrapper(updateUser),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
