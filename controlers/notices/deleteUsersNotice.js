const { Notice } = require("../../models/notice");

const { HttpError } = require("../../helpers");

const deleteUsersNotice = async (req, res) => {
  const { _id } = req.user;
  const { noticeId } = req.params;

  try {
    const deletedNotice = await Notice.findOneAndDelete({
      _id: noticeId,
      owner: _id,
    });
    if (!deletedNotice) {
      throw HttpError(404, "Not found");
    }

    res.status(204);
  } catch (error) {
    console.log("Error deleting notice:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deleteUsersNotice;
