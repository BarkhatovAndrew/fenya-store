import { Link } from 'react-router-dom';
import './AdminNav.scss';

export default function AdminNav() {
  return (
    <>
      <nav>
        <div className="container">
          <Link to="/items/add">Добавить товар</Link>
          <Link to="/items">Все товары</Link>
          <Link to="/reviews">Отзывы</Link>
          <Link to="/animal/check">Объявления</Link>
        </div>
      </nav>
    </>
  );
}