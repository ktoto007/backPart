const { ctrlWrapper } = require("../../helpers");
const getUserInfo = require('./getUserInfo');

module.exports = {
    getUserInfo: ctrlWrapper(getUserInfo),
}

