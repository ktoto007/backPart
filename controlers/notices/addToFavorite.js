const { Notice } = require("../../models/notice");

const addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const noticeId = req.params.noticeId;

  const notice = await Notice.findById(noticeId);
  if (!notice) {
    return res.status(404).json({ message: "Notice not found" });
  }

  if (!notice.favorite.includes(userId)) {
    notice.favorite.push(userId);
    await notice.save();
    res.json({ message: "Notice added to favorites" });
  } else {
    res.json({ message: "Notice is already in favorites" });
  }
};

module.exports = addToFavorites;
