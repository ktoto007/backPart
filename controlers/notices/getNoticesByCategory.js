const { Notice } = require("../../models/notice");
const pagination = require("../../utils/pagination");

const getNoticesByCategory = async (req, res) => {
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

    res.status(200).json({
      message: "Notices fetched successfully",
      notices: results,
      currentPage,
      totalPages,
    });
};

module.exports = getNoticesByCategory;
