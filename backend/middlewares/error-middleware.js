//!Error Handling refers to how Express catches and processes errors that occur both synchronously and asynchronously

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails || "Error from the Backend";

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
