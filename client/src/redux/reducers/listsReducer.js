import { INIT_LISTS } from '../actionTypes/listsAT';
const initialState = { types: [], categories: [] };

export const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_LISTS:
      return action.payload;

    default:
      return state;
  }
};
