const CustomError = require('./CustomError');

class ValidationError extends CustomError {
  constructor(errors, message = 'Validation failed') {
    super(message, 400);
    this.errors = errors;
  }
}

module.exports = ValidationError;