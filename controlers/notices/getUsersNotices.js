const { Notice } = require("../../models/notice");
const pagination = require("../../utils/pagination");

const getUsersNotices = async (req, res) => {
  const { _id } = req.user;
    const { page, limit } = req.query;

    const query = { owner: _id };

    const { results, currentPage, totalPages } = await pagination(
      Notice,
      query,
      page,
      limit
    );

    res.status(200).json({
      message: "User`s notices fetched successfully",
      notices: results,
      currentPage,
      totalPages,
    });
};

module.exports = getUsersNotices;
