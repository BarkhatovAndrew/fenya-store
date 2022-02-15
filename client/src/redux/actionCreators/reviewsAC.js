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

export const initReviewsAC = payload => {
  return {
    type: GET_REVIEWS,
    payload,
  };
};

export const createReviewAC = payload => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

export const setReviewsList = payload => {
  return {
    type: SET_REVIEWS_LIST,
    payload,
  };
};

export const errorResponseReviewAC = payload => {
  return {
    type: REVIEW_RESPONSE_ERROR,
    payload,
  };
};

export const successResponseReviewAC = payload => {
  return {
    type: REVIEW_RESPONSE_SUCCESS,
    payload,
  };
};

export const pendingResponseReviewAC = () => {
  return {
    type: REVIEW_RESPONSE_PENDING,
    payload: null,
  };
};

export const publicReviewsAC = payload => {
  return {
    type: REVIEW_TO_PUBLIC,
    payload,
  };
};

export const deleteReviewsAC = payload => {
  return {
    type: DELETE_REVIEW,
    payload,
  };
};
