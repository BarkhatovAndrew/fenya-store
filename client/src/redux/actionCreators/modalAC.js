import { SHOW_MODAL } from '../actionTypes/modalAT';

export const showModalAC = payload => {
  return {
    type: SHOW_MODAL,
    payload,
  };
};
