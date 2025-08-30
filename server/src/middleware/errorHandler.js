function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
}

module.exports = { errorHandler };
