class AppError extends Error {
  constructor(message, statusCode = 500, isCustom = false) {
    super(message);
    this.statusCode = statusCode;
    this.isCustom = isCustom;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
