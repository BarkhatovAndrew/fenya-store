import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './AnimalPage.scss';

export default function AnimalPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { currentAnimal } = useSelector(state => state.animals);

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_CURRENT_ANIMAL', payload: params.id });
  }, [dispatch, params.id]);
  console.log(currentAnimal, 'currentAnimal');
  return (
    <>
      <h1>{currentAnimal?.title}</h1>
      <div className="animal-single-card">
        <div className="animal-card-photo">
          <img
            src={
              currentAnimal?.img.split('/')[0] === 'https:'
                ? currentAnimal?.img
                : `/storage/${currentAnimal?.img}`
            }
            alt=""
          />
        </div>
        <div className="animal-card-description">
          <p>
            <strong>Имя</strong>: {currentAnimal?.name}
          </p>
          <p>
            <strong>Порода</strong>: {currentAnimal?.breed}
          </p>
          <p>
            <strong>Возраст</strong>: {currentAnimal?.age}
          </p>
          <p>
            <strong>Описание</strong>: {currentAnimal?.description}
          </p>
        </div>
      </div>
      <div className="owner-info">
        <h4>Информация о владельце</h4>
        <p>
          <strong>Имя</strong>: {currentAnimal?.User?.name}
        </p>
        <p>
          <strong>Город</strong>: {currentAnimal?.city}
        </p>
        <p>
          <strong>Email</strong>: {currentAnimal?.User?.email}
        </p>
        <p>
          <strong>Телефон</strong>: {currentAnimal?.User?.phone}
        </p>
      </div>
    </>
  );
}
