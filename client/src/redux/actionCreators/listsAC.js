import { INIT_LISTS } from '../actionTypes/listsAT';

export const initListsAC = payload => {
  return {
    type: INIT_LISTS,
    payload,
  };
};
