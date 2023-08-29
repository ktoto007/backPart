const { Notice } = require("../../models/notice");

const removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const noticeId = req.params.noticeId;

  const notice = await Notice.findById(noticeId);
  if (!notice) {
    return res.status(404).json({ message: "Notice not found" });
  }

  if (notice.favorite.includes(userId)) {
    notice.favorite = notice.favorite.filter((id) => id !== userId);
    await notice.save();
    res.status(204).json();
  } else {
    res.json({ message: "Notice was not in favorites" });
  }
};

module.exports = removeFromFavorites;
