import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { error, info } from '../../utils/toast';
import './ItemEditForm.scss';

function ItemEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editForm = useRef();

  const currentItem = useSelector(state => state.items.currentItem);
  const itemResponseSuccess = useSelector(
    state => state.items.itemResponseSuccess
  );
  const itemResponseError = useSelector(state => state.items.itemResponseError);

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_CURRENT_ITEM', payload: id });
  }, [dispatch, id]);

  const editItem = event => {
    event.preventDefault();

    const editedItem = new FormData(editForm.current);

    dispatch({
      type: 'FETCH_PUT_ITEM',
      payload: {
        item: editedItem,
        id: id,
      },
    });
  };

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      if (itemResponseSuccess) {
        info('Информация отредактирована!');
      } else if (itemResponseError) {
        error('Ошибка!');
      }
    } else {
      notInitialRender.current = true;
    }
  }, [itemResponseSuccess, itemResponseError]);

  return (
    <div className="edit-item-admin">
      <h3>Редактировать товар</h3>
      <form onSubmit={editItem} ref={editForm} encType="multipart/form-data">
        <label>
          Название:
          <input
            autoComplete="off"
            type="text"
            name="title"
            defaultValue={currentItem.title}
          />
        </label>
        <label>
          Цена:
          <input
            autoComplete="off"
            type="number"
            name="price"
            defaultValue={currentItem.price}
          />
        </label>
        <label>
          Описание:
          <textarea
            autoComplete="off"
            type="text"
            name="description"
            defaultValue={currentItem.description}
          />
        </label>
        <label>
          Количество:
          <input
            autoComplete="off"
            type="number"
            name="amount"
            defaultValue={currentItem.amount}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default ItemEditForm;
