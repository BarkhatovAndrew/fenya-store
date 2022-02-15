const authService = require('../services/auth');
const userService = require('../services/user');

async function signUp(req, res) {
  try {
    const user = await userService.createUser(req.body);
    const token = await authService.createToken(user);
    res.status(201).json({
      success: true,
      message: 'Регистрация прошла успешно',
      token,
      // user,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
}
async function signIn(req, res) {
  try {
    const user = await authService.login(req.body);
    const token = await authService.createToken(user);
    res.status(200).json({
      success: true,
      message: 'Авторизация прошла успешно',
      token,
      user,
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e.message,
    });
  }
}

module.exports = {
  signUp,
  signIn,
};
