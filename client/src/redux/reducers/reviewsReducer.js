import {
  CREATE_REVIEW,
  GET_REVIEWS,
  SET_REVIEWS_LIST,
  REVIEW_RESPONSE_SUCCESS,
  REVIEW_RESPONSE_ERROR,
  REVIEW_RESPONSE_PENDING,
  REVIEW_TO_PUBLIC,
  DELETE_REVIEW,
} from '../actionTypes/reviewsAT';

const initialState = {
  reviews: [],
  reviewResponseSuccess: null,
  reviewResponsePending: null,
  reviewResponseError: null,
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case SET_REVIEWS_LIST:
      return {
        ...state,
        reviews: action.payload,
      };

    case REVIEW_RESPONSE_SUCCESS:
      return {
        ...state,
        reviewResponseSuccess: true,
        reviewResponsePending: null,
        reviewResponseError: false,
      };

    case REVIEW_RESPONSE_ERROR:
      return {
        ...state,
        reviewResponseSuccess: false,
        reviewResponsePending: null,
        reviewResponseError: true,
      };

    case REVIEW_RESPONSE_PENDING:
      return {
        ...state,
        reviewResponseSuccess: null,
        reviewResponsePending: true,
        reviewResponseError: null,
      };

    case REVIEW_TO_PUBLIC:
      return {
        ...state,
        reviews: state.reviews.map(el => {
          if (el.id === Number(action.payload)) {
            return {
              ...el,
              isChecked: true,
            };
          } else {
            return el;
          }
        }),
      };

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => {
          return review.id !== Number(action.payload);
        }),
      };

    default:
      return state;
  }
};
