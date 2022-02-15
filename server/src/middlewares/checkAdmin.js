async function checkAdmin(req, res, next) {
  const { isAdmin } = req;
  if (isAdmin) next();
  res.status(400).json({ message: 'kek' });
}

module.exports = { checkAdmin };
