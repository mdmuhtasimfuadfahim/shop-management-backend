class ApiError extends Error {
  constructor(errorCode = 0, message, data, isOperational = true, stack = '') {
    super(message);
    this.errorCode = errorCode;
    // code define here
    if (errorCode >= 3000 && errorCode < 4000) this.statusCode = 406;
    else if (errorCode === 404) this.statusCode = 404;
    else this.statusCode = 400;
    this.data = data;
    this.message = message;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
