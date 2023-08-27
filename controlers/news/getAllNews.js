const { HttpError } = require("../../helpers");
const { News } = require("../../models/news");

const getAllNews = async (req, res) => {
  try {
    const { searchQuery, page = 1, limit = 20 } = req.query;

    const query = {};

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    const currentPage = Number(page);
    const itemsPerPage = Number(limit);

    const skip = (currentPage - 1) * itemsPerPage;

    const news = await News.find(query).skip(skip).limit(itemsPerPage);

    const totalCount = await News.countDocuments(query);

    if (news.length === 0) {
      throw HttpError(404, "No news found");
    }
    res.status(200).json({
      news,
      currentPage,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getAllNews;
