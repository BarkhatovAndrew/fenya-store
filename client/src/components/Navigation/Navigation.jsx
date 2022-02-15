import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUserAC } from '../../redux/actionCreators/userAC';
import { unAuthNav } from '../../utils/navLinks';
import { authNav } from '../../utils/navLinks';
import './Navigation.scss';

export default function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.users);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutUserAC());
  };

  return (
    <>
      <nav>
        <div className="container">
          {user?.success
            ? authNav.map(link => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active-link' : 'unactive-link'
                  }
                  key={link.url}
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              ))
            : unAuthNav.map(link => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'active-link' : 'unactive-link'
                  }
                  key={link.url}
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              ))}
          {user?.success ? (
            <NavLink to="/logout" onClick={logout}>
              Выход
            </NavLink>
          ) : null}
        </div>
      </nav>
    </>
  );
}
