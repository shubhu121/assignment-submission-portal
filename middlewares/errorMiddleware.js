// src/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    // Set default status code if not already set
    const statusCode = err.status || 500;

    // Log the error (optional, you can customize logging here)
    console.error(err.stack);

    // Send JSON response with error message and status code
    res.status(statusCode).json({
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;
