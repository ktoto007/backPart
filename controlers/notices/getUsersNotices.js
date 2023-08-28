const { Notice } = require("../../models/notice");
const pagination = require("../../utils/pagination");

const getUsersNotices = async (req, res) => {
  const { _id } = req.user;

  try {
    const { page, limit } = req.query;

    const query = { owner: _id };

    const { results, currentPage, totalPages } = await pagination(
      Notice,
      query,
      page,
      limit
    );

    if (results.length === 0) {
      return res.status(404).json({
        message: "No notices found",
      });
    }

    res.status(200).json({
      message: "User`s notices fetched successfully",
      notices: results,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.log("Error fetching user`s notices:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getUsersNotices;
