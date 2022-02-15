import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItemsBasketAC } from '../../redux/actionCreators/basketAC';
import ReviewsList from '../ReviewsList/ReviewsList';
import { info } from '../../utils/toast';

import './Item.scss';
import RelativeItems from '../RelativeItems/RelativeItems';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export default function Item() {
  const inputItem = useRef();
  const params = useParams();
  const dispatch = useDispatch();

  const { basketItems } = useSelector(state => state.basketItems);
  const { currentItem } = useSelector(state => state.items);

  const addBacket = () => {
    const newItem = { ...currentItem, count: +inputItem.current.value };
    dispatch(addItemsBasketAC(newItem));
    info('Товар добавлен в корзину');
  };

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }, [basketItems]);

  useEffect(() => {
    if (Number.isInteger(Number(params.id))) {
      dispatch({ type: 'FETCH_GET_CURRENT_ITEM', payload: params.id });
    }
  }, [dispatch, params.id]);

  return (
    <>
      <div className="item-container">
        <Breadcrumbs currentItem={currentItem} />
        <div className="item-top">
          <div className="item-img">
            <img
              src={
                currentItem.img?.split('/')[0] === 'https:'
                  ? currentItem.img
                  : `/storage/${currentItem.img}`
              }
              alt=""
            />
          </div>
          <div className="item-short-description">
            <h3>{currentItem.title}</h3>
            {currentItem.rating ? (
              <p>
                <strong>Рейтинг</strong>:{' '}
                {currentItem.rating > 5 ? 5 : currentItem.rating}/5
              </p>
            ) : (
              <p>Недостаточно оценок для формирования рейтинга</p>
            )}

            <p className="item-price">{currentItem.price} ₽</p>
            <p className="in-stock">В наличии</p>
            <input
              autoComplete="off"
              className="item-counter"
              type="number"
              defaultValue={1}
              ref={inputItem}
              required
            />
            <button onClick={() => addBacket()} className="regular-btn">
              Добавить в корзину
            </button>
          </div>
        </div>
        <h3>Описание товара</h3>
        <div className="item-description">{currentItem.description}</div>
        <h3>Похожие товары</h3>
        <RelativeItems id={params.id} />
        <h3>Отзывы</h3>
        <ReviewsList />
      </div>
    </>
  );
}
