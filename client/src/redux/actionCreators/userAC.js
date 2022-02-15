import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  INIT_USER_ORDER,
  INIT_USER_ANIMALS,
} from '../actionTypes/userAT';

export const createUserAC = payload => {
  return {
    type: CREATE_USER,
    payload,
  };
};

export const loginUserAC = payload => {
  return {
    type: LOGIN_USER,
    payload,
  };
};

export const initUserOrderAC = payload => {
  return {
    type: INIT_USER_ORDER,
    payload,
  };
};

export const updateUserAC = payload => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const initUserAnimalsAC = payload => {
  return {
    type: INIT_USER_ANIMALS,
    payload,
  };
};

export const logoutUserAC = payload => {
  return {
    type: LOGOUT_USER,
    payload,
  };
};
