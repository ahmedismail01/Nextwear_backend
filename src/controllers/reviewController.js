const reviewQuery = require("../queries/reviewQuery");
const { paginate, paginationResponse } = require("../utils/paginate");
const parseSortParam = require("../utils/parseSortParam");

const getAllReviews = async (req, res) => {
  const { page, limit, sort, ...query } = req.query;

  const sortObj = parseSortParam(sort);

  const { offset } = paginate(page, limit);

  const { reviews, count } = await reviewQuery.getRecords(
    query,
    offset,
    limit,
    sortObj
  );

  const pagination = paginationResponse(page, count, limit);

  res.json({ success: true, data: reviews, pagination });
};

module.exports = {
  getAllReviews,
};
