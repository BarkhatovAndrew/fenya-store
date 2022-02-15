import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { info, error } from '../../../utils/toast';

import './Login.scss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInput = useRef();
  const passwordInput = useRef();

  const { user: isAuth } = useSelector(state => state.users);

  useEffect(() => {
    if (isAuth?.success) {
      navigate('/profile');
      info('Успешный вход');
    } else {
      error(isAuth?.message);
    }
  }, [dispatch, isAuth, navigate]);

  const formHandler = event => {
    event.preventDefault();
    const user = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    dispatch({ type: 'FETCH_LOGIN_USER', payload: user });
  };
  return (
    <>
      <h1>Войти в личный кабинет</h1>
      <form onSubmit={formHandler} className="login-form">
        <input
          autoComplete="off"
          ref={emailInput}
          id="email"
          type="email"
          placeholder="Логин"
          required
        />

        <input
          autoComplete="off"
          ref={passwordInput}
          id="password"
          type="password"
          placeholder="Пароль"
          required
        />

        <button className="regular-btn login-btn">Войти</button>
      </form>
    </>
  );
}

export default Login;
