const { HttpError } = require("../../helpers");
const { News } = require("../../models/news");
const pagination = require("../../utils/pagination");

const getAllNews = async (req, res) => {
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

    res.status(200).json({
      news: results,
      currentPage,
      totalPages,
    });
};

module.exports = getAllNews;
