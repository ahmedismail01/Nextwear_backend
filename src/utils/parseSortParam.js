module.exports = function parseSortParam(sortParam) {
  if (!sortParam) return { createdAt: -1 };

  const sortObj = {};
  const fields = sortParam.split(",");

  for (const field of fields) {
    const isDesc = field.startsWith("-");
    const fieldName = isDesc ? field.slice(1) : field;
    sortObj[fieldName] = isDesc ? -1 : 1;
  }

  return Object.keys(sortObj).length ? sortObj : { createdAt: -1 };
};
