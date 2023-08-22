const { ctrlWrapper } = require("../../helpers");

const addNotice = require('./addNotice');
const getNoticesByCategory = require('./getNoticesByCategory');

module.exports = {
    addNotice: ctrlWrapper(addNotice),
    getNoticesByCategory: ctrlWrapper(getNoticesByCategory),

};