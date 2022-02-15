import { Outlet } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';
import './AdminPage.scss';

export default function AdminPage() {
  return (
    <div className="admin-panel">
      <h2>Панель администратора</h2>
      <hr />
      <div className="admin-container">
        <AdminNav />
        <Outlet />
      </div>
    </div>
  );
}
