import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { sortAscAC, sortDescAC } from '../../redux/actionCreators/itemsAC';
import './Category.scss';

export default function Category() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const { items } = useSelector(state => state.items);

  useEffect(() => {
    dispatch({
      type: 'FETCH_GET_ITEMS',
      payload: {
        type: pathname.split('/')[1],
        category: pathname.split('/')[2] ?? 'all',
      },
    });
  }, [dispatch, pathname]);

  const sortAsc = () => {
    dispatch(sortAscAC());
  };

  const sortDesc = () => {
    dispatch(sortDescAC());
  };

  return (
    <>
      {pathname === '/cats/toys' && <h1>Игрушки для кошек</h1>}
      {pathname === '/cats/food' && <h1>Еда для кошек</h1>}
      {pathname === '/cats/clothes' && <h1>Одежда и аксессуары для кошек</h1>}
      {pathname === '/dogs/toys' && <h1>Игрушки для собак</h1>}
      {pathname === '/dogs/food' && <h1>Еда для собак</h1>}
      {pathname === '/dogs/clothes' && <h1>Одежда и аксессуары для собак</h1>}
      {pathname === '/toys' && <h1>Игрушки для животных</h1>}
      {pathname === '/food' && <h1>Еда для животных</h1>}
      {pathname === '/clothes' && <h1>Одежда и аксессуары для животных</h1>}

      <div className="sort-block">
        <p>Отсортировать по цене:</p>
        <span onClick={sortDesc}>По возрастанию</span>
        <span onClick={sortAsc}>По убыванию</span>
      </div>

      <div className="items-list">
        {items.map(item => (
          <div className="item-card" key={item.id}>
            <Link to={`${window.location.pathname}/${item.id}`}>
              <img src={item.img} alt="" />
            </Link>
            <Link to={`${window.location.pathname}/${item.id}`}>
              {item.title}
            </Link>
            <p className="price">{item.price} p.</p>
          </div>
        ))}
      </div>
    </>
  );
}