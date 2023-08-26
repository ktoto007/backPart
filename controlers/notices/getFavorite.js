const { Notice } = require("../../models/notice");

const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const userNotices = await Notice.find({ favorite: userId });
    res.json(userNotices);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getFavorites,
};
