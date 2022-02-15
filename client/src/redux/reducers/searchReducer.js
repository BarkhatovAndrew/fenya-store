import {
  INIT_SEARCH_LIST,
  DELETE_SEARCH_LIST,
  INIT_RESULTS,
} from '../actionTypes/searchAT';
const initialState = { search: [], results: [] };

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SEARCH_LIST:
      return { ...state, search: action.payload };

    case INIT_RESULTS:
      return { ...state, results: [...state.search] };

    case DELETE_SEARCH_LIST:
      return { ...state, search: [] };

    default:
      return state;
  }
};
