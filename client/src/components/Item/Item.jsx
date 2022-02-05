import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import './Item.scss';

export default function Item() {
  const params = useParams();
  const dispatch = useDispatch();
  const currentUrl = window.location.pathname;
  const breadcrumbs = currentUrl.split('/');

  const { currentItem } = useSelector(state => state.items);

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_CURRENT_ITEM', payload: params.foodId });
  }, [dispatch, params.foodId]);

  return (
    <>
      <div className="item-container">
        <div className="breadcrumbs">
          <Link to={'/'}>главная</Link>
          <span>{'>'}</span>
          <Link to={`/${breadcrumbs[1]}`}>{breadcrumbs[1]}</Link>
          <span>{'>'}</span>
          <Link className='current-url' to={`/${breadcrumbs[1]}/${breadcrumbs[2]}`}>
            {breadcrumbs[2]}
          </Link>
        </div>
        <div className="item-top">
          <div className="item-img">
            <img src={currentItem.img} alt="" />
          </div>
          <div className="item-short-description">
            <h3>{currentItem.title}</h3>
            <p className="item-price">{currentItem.price} p.</p>
            <p className="in-stock">В наличии</p>
            <input
              className="item-counter"
              type="number"
              defaultValue={1}
              required
            />
            <button className="regular-btn">Добавить в корзину</button>
          </div>
        </div>
        <h3>Описание товара</h3>
        <div className="item-description">{currentItem.description}</div>
        <h3>Отзывы</h3>
      </div>
    </>
  );
}