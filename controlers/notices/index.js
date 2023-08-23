const { ctrlWrapper } = require("../../helpers");

const addNotice = require('./addNotice');
const getOneNotice = require('./getOneNotice');
const getNoticesByCategory = require('./getNoticesByCategory');

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getOneNotice: ctrlWrapper(getOneNotice),
    getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
};