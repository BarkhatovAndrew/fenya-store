import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  applyPromoAC,
  clearBasketAC,
} from '../../redux/actionCreators/basketAC';

function TotalItemCard() {
  const dispatch = useDispatch();

  const { basketItems, promo } = useSelector(state => state.basketItems);
  const total = basketItems.reduce((sum, el) => sum + el.price * el.count, 0);

  const clearBasket = e => {
    e.preventDefault();
    dispatch(clearBasketAC());
  };

  const applyPromo = e => {
    e.preventDefault();
    if (
      total &&
      e.target.promo.value === process.env.REACT_APP_PROMOCODE &&
      !promo
    ) {
      dispatch(applyPromoAC());
      localStorage.setItem('promo', true);
    }
  };

  return (
    <div className="total-item-card">
      <h4>Ваш заказ:</h4>
      <p>
        Товаров на сумму: <strong>{total}</strong> ₽
      </p>
      <form onSubmit={applyPromo}>
        {promo ? (
          <>
            <p style={{ color: 'green', margin: 0 }}>Ваша скидка 10%</p>
            <input disabled type="text" name="promo" placeholder="Промокод" />
            <button disabled className="promo-btn" type="submit">
              Применить промокод
            </button>
          </>
        ) : (
          <>
            <input
              autoComplete="off"
              type="text"
              name="promo"
              placeholder="Промокод"
            />
            <button className="promo-btn" type="submit">
              Применить промокод
            </button>
          </>
        )}
      </form>

      <button className="regular-btn login-btn">Войти</button>

      <button className="regular-btn">
        <Link to="/basket/orderform">Оформить заказ</Link>
      </button>

      <button className="empty-btn" onClick={clearBasket}>
        Очистить корзину
      </button>
    </div>
  );
}

export default TotalItemCard;
