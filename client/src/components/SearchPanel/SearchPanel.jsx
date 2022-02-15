import './SearchPanel.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { debounce } from '../../utils/debounce';
import { useRef } from 'react';
import { showModalAC } from '../../redux/actionCreators/modalAC';
import BasketHover from '../BasketHover/BasketHover';

export default function SearchPanel() {
  const { show } = useSelector(state => state.modal);
  const [search, setSearch] = useState('');

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const results = useSelector(state => state.search.search);

  const resultsContainer = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setIsDropdownVisible(false);
    setSearch('');
  }, [pathname]);

  useEffect(() => {
    document.body.addEventListener('click', onClick);

    return () => {
      document.body.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const handleSearch = debounce(search => {
    if (search.length !== 0) {
      dispatch({ type: 'FETCH_GET_SEARCH_LIST', payload: { search } });
    } else {
      dispatch({ type: 'DELETE_SEARCH_LIST' });
    }
  });

  function onClick(event) {
    if (
      resultsContainer.current?.contains(event.target) ||
      inputRef.current?.contains(event.target)
    ) {
      return;
    }

    dispatch({ type: 'DELETE_SEARCH_LIST' });
    setSearch('');
    setIsDropdownVisible(false);
  }

  function handleFocus() {
    setIsDropdownVisible(true);
  }

  function handleForm(event) {
    event.preventDefault();
    inputRef.current.blur();
    setSearch('');

    setIsDropdownVisible(false);
    dispatch({ type: 'INIT_RESULTS' });
    navigate('/search/results');
  }

  const { basketItems } = useSelector(state => state.basketItems);

  const showModal = () => {
    basketItems.length && dispatch(showModalAC());
  };

  return (
    <div className="search-panel">
      {show ? (
        <div className="basket-hover-parent">
          <BasketHover />
        </div>
      ) : null}
      <div className="search-container">
        <div className="logo">
          <Link to={'/'}>
            <h1>Fenya Store</h1>
          </Link>
          <p>Интернет-зоомагазин</p>
        </div>
        <div className="search">
          <form onSubmit={handleForm}>
            <input
              autoComplete="off"
              ref={inputRef}
              value={search}
              className="search-input"
              type="text"
              placeholder="Поиск"
              onChange={e => setSearch(e.target.value)}
              onFocus={handleFocus}
            />
            {isDropdownVisible && (
              <div ref={resultsContainer} className="search-results">
                {results.length > 0 ? (
                  results.map(result => (
                    <Link
                      key={result.id}
                      className="search-results-item"
                      to={`items/${result.id}`}
                    >
                      {result.title}
                    </Link>
                  ))
                ) : (
                  <p className="search-results-no-found">Ничего не найдено</p>
                )}
              </div>
            )}
          </form>
        </div>

        <Link to="/basket" onMouseEnter={showModal} onMouseLeave={showModal}>
          <button className="regular-btn basket-btn">Корзина</button>
          {basketItems.length ? (
            <div className="basket-counter">
              <span>{basketItems.length}</span>
            </div>
          ) : null}
        </Link>
      </div>
      <Navigation />
    </div>
  );
}
