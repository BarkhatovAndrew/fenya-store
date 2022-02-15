import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BulletinBoardCard from '../BulletinBoardCard/BulletinBoardCard';
import { Link } from 'react-router-dom';
import './BulletinBoard.scss';

function BulletinBoard() {
  const { animals } = useSelector(state => state.animals);
  const publishedAnimals = animals.filter(animal => animal.isChecked === true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_ANIMALS' });
  }, [dispatch]);

  return (
    <div className="animals-block">
      <h1>Доска объявлений</h1>
      <Link to="/addform">
        <button className="regular-btn">Подать объявление</button>
      </Link>
      <div className="animals-board">
        {publishedAnimals.length &&
          publishedAnimals.map(animal => (
            <BulletinBoardCard key={animal.id} animal={animal} />
          ))}
      </div>
    </div>
  );
}

export default BulletinBoard;
