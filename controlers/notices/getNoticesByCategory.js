const { Notice } = require("../../models/notice");

const getNoticesByCategory = async (req, res) => {
  const { category, searchQuery, page = 1, limit = 20 } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }

  const currentPage = Number(page);
  const itemsPerPage = Number(limit);

  const skip = (currentPage - 1) * itemsPerPage;

  const notices = await Notice.find(query).skip(skip).limit(itemsPerPage);

  const totalCount = await Notice.countDocuments(query);

  if (notices.length === 0) {
    return res.status(404).json([]);
  }

  res.status(200).json({
    message: "Notices fetched successfully",
    notices,
    currentPage,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  });
};

module.exports = getNoticesByCategory;
