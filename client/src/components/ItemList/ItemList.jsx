import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { error, info } from '../../utils/toast';

function ItemList() {
  const items = useSelector(state => state.items.items);
  const itemResponseSuccess = useSelector(
    state => state.items.itemResponseSuccess
  );
  const itemResponseError = useSelector(state => state.items.itemResponseError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_ITEM_LIST' });
  }, [dispatch]);

  const deleteFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_DELETE_ITEM', payload: id });
  };

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      if (itemResponseSuccess) {
        info('Товар удален!');
      } else if (itemResponseError) {
        error('Ошибка!');
      }
    } else {
      notInitialRender.current = true;
    }
  }, [itemResponseSuccess, itemResponseError]);

  return (
    <div className="all-items-admin">
      <h3>Все товары</h3>
      <ul>
        {items?.length &&
          items.map(item => (
            <li key={item.id}>
              <img
                src={
                  item.img.split('/')[0] === 'https:'
                    ? item.img
                    : `/storage/${item.img}`
                }
                alt=""
              />
              <p>{item.title}</p>
              <Link to={`/admin/items/${item.id}`}>
                <button className="empty-btn-blue">Редактировать</button>
              </Link>
              <button
                className="empty-btn"
                key={item.id}
                data-id={item.id}
                onClick={deleteFetch}
              >
                Удалить
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ItemList;
