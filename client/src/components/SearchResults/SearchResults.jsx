import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Category/Category.scss';

export default function SearchResults() {
  const results = useSelector(state => state.search.results);

  return (
    <>
      <div className="sort-block">
        <h1>Результаты поиска:</h1>
      </div>
      <div className="items-list">
        {results?.map(result => (
          <div className="item-card" key={result.id}>
            <Link to={`${window.location.pathname}/${result.id}`}>
              <img src={result.img} alt="" />
            </Link>
            <Link to={`${window.location.pathname}/${result.id}`}>
              {result.title}
            </Link>
            <p className="price">{result.price}₽</p>
          </div>
        ))}
      </div>
    </>
  );
}
