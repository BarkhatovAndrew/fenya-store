import { Link } from 'react-router-dom';
import './AdminNav.scss';

export default function AdminNav() {
  return (
    <>
      <nav className="admin-nav">
        <div className="admin-container">
          <h4>Навигация</h4>
          <Link to="/admin/items/add">Добавить товар</Link>
          <Link to="/admin/items">Все товары</Link>
          <Link to="/admin/reviews/check">Отзывы</Link>
          <Link to="/admin/animal/addform">Добавить объявление</Link>
          <Link to="/admin/animal/check">Объявления</Link>
          <Link to="/admin/orders">Заказы</Link>
        </div>
      </nav>
    </>
  );
}
