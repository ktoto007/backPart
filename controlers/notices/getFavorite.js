const { Notice } = require("../../models/notice");

const getFavorites = async (req, res) => {
  const userId = req.user.id;

  const userNotices = await Notice.find({ favorite: userId });
  res.json(userNotices);
};

module.exports = getFavorites;
