const pagination = async (model, query, page = 1, limit = 20) => {
  const currentPage = Number(page);
  const itemsPerPage = Number(limit);
  const skip = (currentPage - 1) * itemsPerPage;

  const results = await model
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(itemsPerPage);
  const totalCount = await model.countDocuments(query);

  return {
    results,
    totalCount,
    currentPage,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
};

module.exports = pagination;
