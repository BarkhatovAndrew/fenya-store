import { INIT_CATEGORIES } from '../actionTypes/itemsAT';

const initialState = { categories: [] };

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CATEGORIES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};
