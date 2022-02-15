import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RelativeItems.scss';

export default function RelativeItems({ id }) {
  const dispatch = useDispatch();

  const { relativeItems } = useSelector(state => state.items);
  const url = window.location.pathname.split('/').slice(0, -1).join('/');

  useEffect(() => {
    if (Number.isInteger(Number(id))) {
      dispatch({ type: 'FETCH_RELATIVE_ITEMS', payload: id });
    }
  }, [dispatch, id]);

  return (
    <div className="relative-item-list">
      {relativeItems?.map(item => (
        <div className="relative-item" key={item.id}>
          <Link to={`${url}/${item.id}`}>
            <img src={item.img} alt={item.title} />
          </Link>
          <p>
            <Link to={`${url}/${item.id}`}>{item.title}</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
