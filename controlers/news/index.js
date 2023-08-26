const { ctrlWrapper } = require("../../helpers");
const getAllNews = require("./getAllNews");

module.exports = {
  getAllNews: ctrlWrapper(getAllNews),
};
