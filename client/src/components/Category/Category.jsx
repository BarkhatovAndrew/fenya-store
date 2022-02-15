import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addItemsBasketAC } from '../../redux/actionCreators/basketAC';
import { info } from '../../utils/toast';
import './Category.scss';

export default function Category() {
  const SORT_TYPES = {
    asc: 'asc',
    desc: 'desc',
  };
  const perPage = 12;

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { items } = useSelector(state => state.items);
  const totalCount = useSelector(state => state.items.totalCount);
  const currentPage = useSelector(state =>
    Math.floor(state.items.offset / perPage)
  );

  const [sort, setSort] = useState(SORT_TYPES.asc);
  const [offset, setOffset] = useState(0);

  const { basketItems } = useSelector(state => state.basketItems);
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const payload =
      segments.length === 1
        ? { category: segments[0] }
        : {
            type: segments[0],
            category: segments[1],
          };

    dispatch({
      type: 'FETCH_GET_ITEMS',
      payload: {
        ...payload,
        sort,
        limit: perPage,
        offset,
      },
    });
  }, [dispatch, pathname, sort, offset]);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }, [basketItems]);

  const addBacket = e => {
    e.preventDefault();
    const idArr = e.target.pathname.split('/');
    const id = Number(idArr[idArr.length - 1]);
    const currentItem = items.find(item => item.id === id);
    const newItem = { ...currentItem, count: +1 };
    dispatch(addItemsBasketAC(newItem));
    info('Товар добавлен в корзину');
  };

  function setPage(pageNumber) {
    setOffset((pageNumber - 1) * perPage);
  }

  function renderTitle() {
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
      </>
    );
  }

  function renderPagination() {
    const totalPageCount = Math.ceil(totalCount / perPage);
    const pages = new Array(totalPageCount).fill().map((_, idx) => idx + 1);

    return pages.map((page, idx) => (
      <button
        className="empty-btn-page"
        key={idx}
        onClick={() => setPage(page)}
      >
        {page}
      </button>
    ));
  }

  return (
    <>
      {renderTitle()}
      <div className="pages">{renderPagination()}</div>

      <div className="sort-block">
        <p>Отсортировать по цене:</p>
        <span onClick={() => setSort(SORT_TYPES.asc)}>По возрастанию</span>
        <span onClick={() => setSort(SORT_TYPES.desc)}>По убыванию</span>
      </div>

      <div className="items-list">
        {items.map(item => (
          <div className="item-card" key={item.id}>
            <Link to={`${window.location.pathname}/${item.id}`}>
              <img
                src={
                  item.img.split('/')[0] === 'https:'
                    ? item.img
                    : `/storage/${item.img}`
                }
                alt=""
              />
            </Link>
            <Link to={`${window.location.pathname}/${item.id}`}>
              {item.title}
            </Link>
            <div className="price-buy">
              <p className="price">{item.price} ₽</p>

              <button className="empty-btn">
                <a
                  href={`${window.location.pathname}/${item.id}`}
                  onClick={addBacket}
                >
                  Купить
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
