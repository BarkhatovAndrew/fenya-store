import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  INIT_ITEMS,
  INIT_CATEGORIES,
  INIT_CURRENT_ITEM,
  INIT_ITEM_LIST,
  ITEM_RESPONSE_SUCCESS,
  ITEM_RESPONSE_PENDING,
  ITEM_RESPONSE_ERROR,
  INIT_RELATIVE_ITEMS,
} from '../actionTypes/itemsAT';

export const addItemsAC = payload => {
  return {
    type: ADD_ITEM,
    payload,
  };
};

export const updateItemsAC = payload => {
  return {
    type: UPDATE_ITEM,
    payload,
  };
};

export const deleteItemsAC = payload => {
  return {
    type: DELETE_ITEM,
    payload,
  };
};

export const initItemsAC = payload => {
  return {
    type: INIT_ITEMS,
    payload,
  };
};

export const initCurrentItemAC = payload => {
  return {
    type: INIT_CURRENT_ITEM,
    payload,
  };
};

export const initCategoriesAC = payload => {
  return {
    type: INIT_CATEGORIES,
    payload,
  };
};

export const initListItemsAC = payload => {
  return {
    type: INIT_ITEM_LIST,
    payload,
  };
};

export const errorResponseAC = payload => {
  return {
    type: ITEM_RESPONSE_ERROR,
    payload,
  };
};

export const successResponseAC = payload => {
  return {
    type: ITEM_RESPONSE_SUCCESS,
    payload,
  };
};

export const pendingResponseAC = () => {
  return {
    type: ITEM_RESPONSE_PENDING,
    payload: null,
  };
};

export const initRelativeItemsAC = payload => {
  return {
    type: INIT_RELATIVE_ITEMS,
    payload,
  };
};
