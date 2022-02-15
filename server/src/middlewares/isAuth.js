const jwt = require('jsonwebtoken');

async function isAuth(req, res, next) {
  try {
    const authHeader = req.get('Authorization'); // получаю из header токен, проверяю правильный ли токен
    const token = authHeader.split(' ')[1];
    const { userId, email, isAdmin } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN
    );
    req.userId = userId;
    req.email = email;
    req.isAdmin = isAdmin;

    next();
  } catch (e) {
    res.status(401).json({ message: 'Пользователь не авторизован' });
    return;
  }
}

module.exports = { isAuth };
