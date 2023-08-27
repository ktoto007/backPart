const { ctrlWrapper } = require("../../helpers");

const addNotice = require("./addNotice");
const getOneNotice = require("./getOneNotice");
const getNoticesByCategory = require("./getNoticesByCategory");
const addToFavorites = require("./addToFavorite");
const removeFromFavorites = require("./removeFromFavorites");
const getFavorites = require("./getFavorite");

module.exports = {
  addNotice: ctrlWrapper(addNotice),
  getOneNotice: ctrlWrapper(getOneNotice),
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  addToFavorites: ctrlWrapper(addToFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  getFavorites: ctrlWrapper(getFavorites),
};
