module.exports.paginate = (page = 1, limit  = 10) => {
  let offset = (page - 1) * limit;

  return { offset, limit };
};

module.exports.paginationResponse = (currentPage = 1, count, limit = 10) => {
  const totalPages = Math.ceil(count / limit) || 1;
  return {
    totalPages,
    totalItems: count,
    currentPage: Number(currentPage),
    next: Number(currentPage) < totalPages,
    prev: Number(currentPage) > 1,
  };
};
