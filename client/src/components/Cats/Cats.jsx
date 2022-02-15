import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cats.scss';

export default function Cats() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch({
      type: 'FETCH_GET_CATEGORY',
      payload: window.location.pathname,
    });
  }, [dispatch]);

  return (
    <div className="cat-categories-list">
      <div className="header-dog">
        <img src="/img/cat-cat.jpg" alt="" />
        <h1>Товары для кошек и котят</h1>
      </div>
      <div className="categories">
        {categories.length > 0 &&
          categories.map(item => (
            <div className="category" key={item.id}>
              <Link to={`${window.location.pathname}/${item.url}`}>
                <img src={item.img} alt="" />
              </Link>

              <Link to={`${window.location.pathname}/${item.url}`}>
                {item.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
