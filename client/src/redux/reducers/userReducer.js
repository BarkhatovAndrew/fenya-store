import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  INIT_USER_ORDER,
  INIT_USER_ANIMALS,
} from '../actionTypes/userAT';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ?? null,
  userItems: [],
  userAnimals: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const newUser = {
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      };

      return {
        ...state,
        user: state.user ? [...state.user, newUser] : [newUser],
      };

    case LOGIN_USER:
      return { ...state, user: action.payload };

    case UPDATE_USER:
      return { ...state, user: action.payload };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    case INIT_USER_ORDER:
      return { ...state, userItems: action.payload };

    case INIT_USER_ANIMALS:
      console.log(action.payload, 'action.payload');
      return { ...state, userAnimals: action.payload };

    default:
      return state;
  }
};
