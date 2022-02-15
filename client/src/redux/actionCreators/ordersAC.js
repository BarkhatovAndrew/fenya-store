import { INIT_ORDERS, DELETE_ORDER } from '../actionTypes/ordersAT';

export const initOrderListAC = payload => {
  return {
    type: INIT_ORDERS,
    payload,
  };
};

export const deleteOrderAC = payload => {
  return {
    type: DELETE_ORDER,
    payload,
  };
};
