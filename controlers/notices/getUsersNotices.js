const { Notice } = require("../../models/notice");

const getUsersNotices = async (req, res) => {
  const { _id } = req.user;

  try {
    const { page = 1, limit = 20 } = req.query;

    const currentPage = Number(page);
    const itemsPerPage = Number(limit);

    const skip = (currentPage - 1) * itemsPerPage;

    const notices = await Notice.find({ owner: _id })
      .skip(skip)
      .limit(itemsPerPage);

    const totalCount = await Notice.countDocuments({ owner: _id });

    if (notices.length === 0) {
      return res.status(404).json({
        message: "No notices found",
      });
    }

    res.status(200).json({
      message: "User`s notices fetched successfully",
      notices,
      currentPage,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (error) {
    console.log("Error fetching user`s notices:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getUsersNotices;
