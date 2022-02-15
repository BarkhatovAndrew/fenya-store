import { SHOW_MODAL } from '../actionTypes/modalAT';

const initialState = {
  show: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};
