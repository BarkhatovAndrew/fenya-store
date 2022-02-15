import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { error, info } from '../../utils/toast';

export default function BoardList() {
  const animals = useSelector(state => state.animals.animals);
  const publishedAnimals = animals.filter(animal => animal.isChecked === true);
  const unpublishedAnimals = animals.filter(
    animal => animal.isChecked === false
  );

  const animalResponseSuccess = useSelector(
    state => state.animals.animalResponseSuccess
  );
  const animalResponseError = useSelector(
    state => state.animals.animalResponseError
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_ANIMALS' });
  }, [dispatch]);

  const deleteFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_DELETE_ANIMAL', payload: id });
  };

  const putFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_CHECK_ANIMAL', payload: id });
  };

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      if (animalResponseSuccess) {
        info('Успешно');
      } else if (animalResponseError) {
        error('Ошибка!');
      }
    } else {
      notInitialRender.current = true;
    }
  }, [animalResponseSuccess, animalResponseError]);

  return (
    <div>
      <div>Неопубликованные объявления:</div>
      <ul>
        {unpublishedAnimals?.length > 0 &&
          unpublishedAnimals.map(animal => (
            <li key={animal.id}>
              {animal.name}
              <img
                src={
                  animal.img.split('/')[0] === 'https:'
                    ? animal.img
                    : `/storage/${animal.img}`
                }
              />
              <button data-id={animal.id} onClick={putFetch}>
                Опубликовать
              </button>
              <button
                className="empty-btn"
                data-id={animal.id}
                onClick={deleteFetch}
              >
                Удалить
              </button>
            </li>
          ))}
      </ul>
      <div>Опубликованные объявления:</div>
      <ul>
        {publishedAnimals?.length > 0 &&
          publishedAnimals.map(animal => (
            <li key={animal.id}>
              {animal.name}
              <img
                src={
                  animal.img.split('/')[0] === 'https:'
                    ? animal.img
                    : `/storage/${animal.img}`
                }
              />
              <button
                className="empty-btn"
                data-id={animal.id}
                onClick={deleteFetch}
              >
                Удалить
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
