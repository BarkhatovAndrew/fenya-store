import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { error, info } from '../../utils/toast';

export default function AdminReviewsList() {
  const reviews = useSelector(state => state.reviews.reviews);
  const publishedReviews = reviews.filter(review => review.isChecked === true);
  const unpublishedReviews = reviews.filter(
    review => review.isChecked === false
  );

  const reviewResponseSuccess = useSelector(
    state => state.reviews.reviewResponseSuccess
  );
  const reviewResponseError = useSelector(
    state => state.reviews.reviewResponseError
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GET_REVIEWS_LIST' });
  }, [dispatch]);

  const deleteFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_DELETE_REVIEW', payload: id });
  };

  const putFetch = event => {
    const id = event.target.dataset.id;
    dispatch({ type: 'FETCH_CHECK_REVIEW', payload: id });
  };

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current) {
      if (reviewResponseSuccess) {
        info('Успешно');
      } else if (reviewResponseError) {
        error('Ошибка!');
      }
    } else {
      notInitialRender.current = true;
    }
  }, [reviewResponseSuccess, reviewResponseError]);

  return (
    <div>
      <div>Неопубликованные объявления:</div>
      <ul>
        {unpublishedReviews?.length > 0 &&
          unpublishedReviews.map(review => (
            <li key={review.id}>
              <p>{review.title}</p>
              <p>{review.description}</p>
              <p>{review.rating}</p>
              <p>{review.User.name}</p>
              <button data-id={review.id} onClick={putFetch}>
                Опубликовать
              </button>
              <button data-id={review.id} onClick={deleteFetch}>
                Удалить
              </button>
            </li>
          ))}
      </ul>
      <div>Опубликованные объявления:</div>
      <ul>
        {publishedReviews?.length > 0 &&
          publishedReviews.map(review => (
            <li key={review.id}>
              <p>{review.title}</p>
              <p>{review.description}</p>
              <p>{review.rating}</p>
              <p>{review.User.name}</p>
              <button data-id={review.id} onClick={deleteFetch}>
                Удалить
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
