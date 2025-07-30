const NotFoundError = require('../errors/NotFoundError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
const ValidationError = require('../errors/ValidationError.js');
const UnauthorizedError = require('../errors/UnauthorizedError.js');

  
  module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
  
    // Handle specific error types
    if (err instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        error: err.message
      });
    }
  
    if (err instanceof BadRequestError) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
  
    if (err instanceof ForbiddenError) {
      return res.status(403).json({
        success: false,
        error: err.message
      });
    }
  
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({
        success: false,
        error: err.message
      });
    }
  
    if (err instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: err.message,
        details: err.errors
      });
    }
  
    if (err.name === 'ValidationError') { // Mongoose validation error
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: Object.values(err.errors).map(e => e.message)
      });
    }
  
    if (err.name === 'CastError') { // Invalid ObjectId
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
  
    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired'
      });
    }
  
    // Default server error
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };