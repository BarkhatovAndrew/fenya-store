import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../ReviewCard/ReviewCard';
import ReviewForm from '../ReviewForm/ReviewForm';

export default function ReviewsList() {
  const dispatch = useDispatch();
  const params = useParams();

  const { reviews } = useSelector(state => state.reviews);
  const publishedReviews = reviews.filter(review => review.isChecked === true);

  useEffect(() => {
    if (Number.isInteger(Number(params.id))) {
      dispatch({ type: 'FETCH_GET_REVIEWS', payload: params.id });
    }
  }, []);

  return (
    <>
      {publishedReviews.length ? (
        publishedReviews.map(item => <ReviewCard key={item.id} item={item} />)
      ) : (
        <p>Отзывов пока нет</p>
      )}

      <ReviewForm />
    </>
  );
}
