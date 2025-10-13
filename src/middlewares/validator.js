const formateError = (error) => {
  return error.path[0] + " " + error.message;
};

const validate = (schema) => (req, res, next) => {
  try {
    if (!schema) return next();

    if (schema.body) {
      const result = schema.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: formateError(result.error.issues[0]),
        });
      }
      req.body = result.data;
    }

    if (schema.params) {
      const result = schema.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: formateError(result.error.issues[0]),
        });
      }
      req.params = result.data;
    }

    if (schema.query) {
      const result = schema.query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: formateError(result.error.issues[0]),
        });
      }
      req.query = result.data;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;
