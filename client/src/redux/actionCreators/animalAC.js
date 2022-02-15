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

export const addAnimalsAC = payload => {
  return {
    type: ADD_ANIMAL,
    payload,
  };
};

export const updateAnimalsAC = payload => {
  return {
    type: UPDATE_ANIMAL,
    payload,
  };
};

export const deleteAnimalsAC = payload => {
  return {
    type: DELETE_ANIMAL,
    payload,
  };
};

export const initAnimalsAC = payload => {
  return {
    type: INIT_ANIMAL,
    payload,
  };
};

export const errorResponseAnimalAC = payload => {
  return {
    type: ANIMAL_RESPONSE_ERROR,
    payload,
  };
};

export const successResponseAnimalAC = payload => {
  return {
    type: ANIMAL_RESPONSE_SUCCESS,
    payload,
  };
};

export const pendingResponseAnimalAC = () => {
  return {
    type: ANIMAL_RESPONSE_PENDING,
    payload: null,
  };
};

export const publicAnimalsAC = payload => {
  return {
    type: ANIMAL_TO_PUBLIC,
    payload,
  };
};

export const initCurrentAnimalAC = payload => {
  return {
    type: INIT_CURRENT_ANIMAL,
    payload,
  };
};
