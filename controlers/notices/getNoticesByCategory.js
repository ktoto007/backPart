const { Notice } = require("../../models/notice");
const pagination = require("../../utils/pagination");

const getNoticesByCategory = async (req, res) => {
  try {
    const { category, searchQuery, page, limit } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

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
      message: "Notices fetched successfully",
      notices: results,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.log("Error fetching notices:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getNoticesByCategory;
