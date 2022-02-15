import { Link } from 'react-router-dom';
import './TypesBlock.scss';

export default function TypesBlock() {
  return (
    <>
      <div className="types-block">
        <h2>Товары по питомцу</h2>
        <div className="types">
          <div className="cat-block">
            <img src="/img/cat.png" alt="" />
            <div className="type-desc">
              <h3>Кошка или котенок</h3>
              <Link to="/cats">
                <button className="regular-btn">Подробнее</button>
              </Link>
            </div>
          </div>
          <div className="dog-block">
            <img src="/img/corgi.png" alt="" />
            <div className="type-desc">
              <h3>Собака или щенок</h3>
              <Link to="/dogs">
                <button className="regular-btn">Подробнее</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
