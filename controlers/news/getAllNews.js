const { HttpError } = require("../../helpers");
const { News } = require("../../models/news");
const pagination = require("../../utils/pagination");

const getAllNews = async (req, res) => {
  try {
    const { searchQuery, page, limit } = req.query;

    const query = {};

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    const { results, currentPage, totalPages } = await pagination(
      News,
      query,
      page,
      limit
    );

    if (results.length === 0) {
      throw HttpError(404, "No news found");
    }
    res.status(200).json({
      news: results,
      currentPage,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getAllNews;
