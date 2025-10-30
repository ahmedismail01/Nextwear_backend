const promocodeQuery = require("../queries/promoCodeQuery");
const promocodeCommand = require("../commands/promoCodeCommand");
const { paginate, paginationResponse } = require("../utils/paginate");
const parseSortParam = require("../utils/parseSortParam");
const promoCodeService = require("../services/promoCodeService");
const getAllPromoCodes = async (req, res) => {
  const { page, limit, sort, ...query } = req.query;
  const sortObj = parseSortParam(sort);
  const { offset } = paginate(page, limit);
  const { promocodes, count } = await promocodeQuery.getRecords(
    query,
    offset,
    limit,
    sortObj
  );
  const pagination = paginationResponse(page, count, limit);
  res.json({ success: true, data: promocodes, pagination });
};

const create = async (req, res) => {
  const data = req.body;
  const promocode = await promoCodeService.create(data);
  res.status(201).json({ success: true, data: promocode });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const promocode = await promocodeCommand.deleteRecord({ _id: id });
  res.json({ success: true, data: promocode });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const promocode = await promocodeCommand.updateRecord({ _id: id }, data);
  res.json({ success: true, data: promocode });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const promocode = await promocodeQuery.getRecord({ _id: id });
  res.json({ success: true, data: promocode });
};

const deactivate = async (req, res) => {
  const { id } = req.params;
  const promocode = await promocodeCommand.updateRecord(
    { _id: id },
    { isActive: false }
  );
  res.json({ success: true, data: promocode });
};

module.exports = {
  getAllPromoCodes,
  create,
  deleteById,
  updateById,
  getById,
  deactivate
};
