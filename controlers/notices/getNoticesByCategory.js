const { Notice } = require("../../models/notice");

const getNoticesByCategory = async (req, res) => {
  try {
    const { category, searchQuery, page = 1, limit = 20 } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);

    const skip = (currentPage - 1) * itemsPerPage;

    const notices = await Notice.find(query).skip(skip).limit(itemsPerPage);

    const totalCount = await Notice.countDocuments(query);

    if (notices.length === 0) {
      return res.status(404).json({
        message: "No notices found",
      });
    }

    res.status(200).json({
      message: "Notices fetched successfully",
      notices,
      currentPage,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    });
  } catch (error) {
    console.log("Error fetching notices:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getNoticesByCategory;
