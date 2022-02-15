import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrederUserCard from '../../OrederUserCard/OrederUserCard';
import { useRef } from 'react';

function Profile(props) {
  const { userItems } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_USER_ANIMALS' });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_USER_ORDER' });
  }, [dispatch]);

  const nameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();

  const userFields = useSelector(state => state.users?.user?.user);

  const updateProfile = event => {
    event.preventDefault();

    const user = {
      name: nameInput.current.value,
      email: emailInput.current.value,
      phone: phoneInput.current.value,
    };

    if (user) {
      dispatch({ type: 'FETCH_PUT_PROFILE', payload: user });
    }
  };

  return (
    <>
      <div>
        <h1>Личный кабинет</h1>
        <h3>Ваши заказы</h3>
        {userItems.userOrder ? (
          userItems.userOrder?.map((item, index) => {
            return (
              <OrederUserCard key={item.id} item={item} number={index + 1} />
            );
          })
        ) : (
          <p>Заказов нет</p>
        )}
      </div>
      <h1>Изменить профиль</h1>
      <form onSubmit={updateProfile} className="login-form">
        <div>
          <input
            ref={nameInput}
            id="name"
            type="text"
            defaultValue={userFields?.name}
            placeholder="Имя"
            autocomplete="off"
            autoFocus
          />
        </div>
        <div>
          <input
            ref={emailInput}
            id="email"
            type="email"
            defaultValue={userFields?.email}
            placeholder="Email"
            autocomplete="off"
          />
        </div>
        <div>
          <input
            ref={phoneInput}
            id="phone"
            type="text"
            defaultValue={userFields?.phone}
            placeholder="Телефон"
            autocomplete="off"
          />
        </div>
        <button onClick={updateProfile}>Сохранить изменения</button>
      </form>
    </>
  );
}

export default Profile;
