import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MainPageAnimals.scss';

export default function MainPageAnimals() {
  const dispatch = useDispatch();

  const { animals } = useSelector(state => state.animals);
  const publishedAnimals = animals.filter(animal => animal.isChecked === true);

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_ANIMALS' });
  }, [dispatch]);

  return (
    <div className="animals-main-block">
      <div className="top-row">
        <h3>Объявления о пристройстве животных</h3>
        <Link to="/board">
          <button className="empty-btn">Посмотреть все</button>
        </Link>
      </div>
      <div className="animal-main-list">
        {publishedAnimals.slice(0, 3).map(animal => (
          <Link key={animal.id} to={`/board/animal/${animal.id}`}>
            <div className="animal-main-card">
              <img src={animal.img} alt={animal.title} />
              <h5>{animal.name}</h5>
              {[2, 3, 4, 22, 23, 24].includes(Number(animal.age)) && (
                <p>{animal.age} года</p>
              )}
              {[1, 21].includes(Number(animal.age)) && <p>{animal.age} год</p>}
              {[
                5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
                26, 27,
              ].includes(Number(animal.age)) && <p>{animal.age} лет</p>}

              <div className="city-date">
                <p>{animal.city}</p>
                <p>{animal.createdAt.slice(0, 10)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
