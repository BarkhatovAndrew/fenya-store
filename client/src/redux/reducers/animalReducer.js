import {
  ADD_ANIMAL,
  UPDATE_ANIMAL,
  DELETE_ANIMAL,
  INIT_ANIMAL,
  ANIMAL_RESPONSE_SUCCESS,
  ANIMAL_RESPONSE_ERROR,
  ANIMAL_RESPONSE_PENDING,
  ANIMAL_TO_PUBLIC,
  INIT_CURRENT_ANIMAL,
} from '../actionTypes/animalAT.js';
const initialState = {
  animals: [],
  currentAnimal: null,
  animalResponseSuccess: null,
  animalResponsePending: null,
  animalResponseError: null,
};

export const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ANIMAL:
      return {
        ...state,
        animals: action.payload,
      };

    case ADD_ANIMAL:
      return {
        ...state,
        animals: state.animals
          ? [...state.animals, action.payload]
          : [action.payload],
      };

    case UPDATE_ANIMAL:
      return {
        ...state,
      };

    case DELETE_ANIMAL:
      return {
        ...state,
        animals: state.animals.filter(animal => {
          return animal.id !== Number(action.payload);
        }),
      };

    case ANIMAL_RESPONSE_SUCCESS:
      return {
        ...state,
        animalResponseSuccess: true,
        animalResponsePending: null,
        animalResponseError: false,
      };

    case ANIMAL_RESPONSE_ERROR:
      return {
        ...state,
        animalResponseSuccess: false,
        animalResponsePending: null,
        animalResponseError: true,
      };

    case ANIMAL_RESPONSE_PENDING:
      return {
        ...state,
        animalResponseSuccess: null,
        animalResponsePending: true,
        animalResponseError: null,
      };

    case ANIMAL_TO_PUBLIC:
      return {
        ...state,
        animals: state.animals.map(el => {
          if (el.id === Number(action.payload)) {
            return {
              ...el,
              isChecked: true,
            };
          } else {
            return el;
          }
        }),
      };

    case INIT_CURRENT_ANIMAL:
      return {
        ...state,
        currentAnimal: action.payload,
      };

    default:
      return state;
  }
};
