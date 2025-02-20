/**
 * Error handler middleware to handle errors globally.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    // Default error status code and message
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Check for specific error types and customize response accordingly
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // If the error is due to invalid JSON in the request body
        statusCode = 400;
        message = 'Invalid JSON in request body';
    } else if (err.name === 'ValidationError') {
        // If the error is a Mongoose validation error
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'UnauthorizedError') {
        // If the error is due to unauthorized access (e.g., JWT token verification failed)
        statusCode = 401;
        message = 'Unauthorized access';
    } else if (err.name === 'NotFound') {
        // If the error is due to a resource not found
        statusCode = 404;
        message = 'Resource not found';
    } else if (err.name === 'DuplicateKeyError') {
        // If the error is due to a duplicate key violation in the database
        statusCode = 409;
        message = 'Duplicate key error';
    }

    // Send response to the client
    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;