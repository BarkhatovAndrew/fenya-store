import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { error, info } from '../../utils/toast';
import './ItemForm.scss';

function ItemForm() {
  const itemForm = useRef();
  const dispatch = useDispatch();
  const types = useSelector(state => state.lists.types);
  const categories = useSelector(state => state.lists.categories);
  const itemResponseSuccess = useSelector(
    state => state.items.itemResponseSuccess
  );
  const itemResponseError = useSelector(state => state.items.itemResponseError);

  const addItem = event => {
    event.preventDefault();

    const data = new FormData(itemForm.current);

    dispatch({ type: 'FETCH_POST_ITEM', payload: data });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_LISTS' });
  }, [dispatch]);

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      if (itemResponseSuccess) {
        info('Товар добавлен!');
      } else if (itemResponseError) {
        error('Ошибка!');
      }
    } else {
      notInitialRender.current = true;
    }
  }, [itemResponseSuccess, itemResponseError]);

  return (
    <div className="add-item-admin">
      <h3>Добавить товар</h3>
      <form ref={itemForm} encType="multipart/form-data" onSubmit={addItem}>
        <input
          autoComplete="off"
          type="text"
          name="title"
          placeholder="Название товара"
          required
        />
        <input
          autoComplete="off"
          type="number"
          name="price"
          placeholder="Цена товара"
          required
        />
        <input
          autoComplete="off"
          type="text"
          name="description"
          placeholder="Описание товара"
          required
        />
        <input
          autoComplete="off"
          type="number"
          name="amount"
          placeholder="Количество товара"
          required
        />
        <input type="file" name="img" placeholder="Добавьте фото" required />
        <select name="type">
          <option disabled>Выберите вид животного</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select name="category">
          <option disabled>Выберите категорию товара</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="regular-btn admin-btn">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
