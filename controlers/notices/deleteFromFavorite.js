const { Notice } = require("../../models/notice");

const removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const noticeId = req.params.noticeId;

  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    if (notice.favorite.includes(userId)) {
      notice.favorite = notice.favorite.filter((id) => id !== userId);
      await notice.save();
      res.json({ message: "Notice removed from favorites" });
    } else {
      res.json({ message: "Notice was not in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  removeFromFavorites,
};
