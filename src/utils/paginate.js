module.exports.paginate = (page, limit) => {
  let offset = (page - 1) * limit;

  return { offset, limit };
};

module.exports.paginationResponse = (currentPage = 1, count, limit) => {
  const totalPages = Math.ceil(count / limit) || 1;
  return {
    totalPages,
    currentPage: Number(currentPage),
    next: Number(currentPage) < totalPages,
    previous: Number(currentPage) > 1,
  };
};
