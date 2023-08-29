const { ctrlWrapper } = require("../../helpers");
const profile = require("./profile");

module.exports = {
  profile: ctrlWrapper(profile),
};
