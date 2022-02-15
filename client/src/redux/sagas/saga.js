import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createUserAC,
  loginUserAC,
  updateUserAC,
  initUserAnimalsAC,
  initUserOrderAC,
} from '../actionCreators/userAC';
import { routesApi } from '../../utils/routesApi';
import {
  initItemsAC,
  deleteItemsAC,
  updateItemsAC,
  addItemsAC,
  initCategoriesAC,
  initCurrentItemAC,
  initListItemsAC,
  successResponseAC,
  errorResponseAC,
  pendingResponseAC,
  initRelativeItemsAC,
} from '../actionCreators/itemsAC';
import { initListsAC } from '../actionCreators/listsAC';
import {
  initAnimalsAC,
  addAnimalsAC,
  deleteAnimalsAC,
  pendingResponseAnimalAC,
  successResponseAnimalAC,
  errorResponseAnimalAC,
  publicAnimalsAC,
  initCurrentAnimalAC,
} from '../actionCreators/animalAC';
import {
  createReviewAC,
  initReviewsAC,
  setReviewsList,
  errorResponseReviewAC,
  successResponseReviewAC,
  pendingResponseReviewAC,
  publicReviewsAC,
  deleteReviewsAC,
} from '../actionCreators/reviewsAC';
import { initOrderListAC, deleteOrderAC } from '../actionCreators/ordersAC';
import { initSearchListAC } from '../actionCreators/searchAC';

async function fetchData({ url, method, headers, body }) {
  const response = await fetch(url, { method, headers, body });
  return await response.json();
}

function* postUserAsync(action) {
  const newUser = yield call(fetchData, {
    url: routesApi.reg,
    method: 'POST',
    headers: { 'Content-Type': 'Application/json' },
    body: JSON.stringify(action.payload),
  });
  yield put(createUserAC(newUser));
}

function* loginUserAsync(action) {
  const user = yield call(fetchData, {
    url: routesApi.login,
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer',
    },
    body: JSON.stringify(action.payload),
  });

  yield put(loginUserAC(user));
  if (user.success) {
    localStorage.setItem('token', user.token.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

function* putUserAsync(action) {
  const user = yield call(fetchData, {
    url: routesApi.users,
    method: 'PUT',
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(action.payload),
  });
  yield put(updateUserAC(user));
}

function* getItemsAsync(action) {
  const { type, category, sort, limit, offset = 0 } = action.payload;
  const query = new URLSearchParams({ offset });

  if (type) {
    query.set('type', type);
  }

  if (category) {
    query.set('category', category);
  }

  if (sort) {
    query.set('sort', sort);
  }

  if (limit) {
    query.set('limit', limit);
  }

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}?${query.toString()}`,
  });

  yield put(initItemsAC(response));
}

function* getSearchListAsync(action) {
  const { search } = action.payload;

  const query = new URLSearchParams({ search });

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}?${query.toString()}`,
  });

  yield put(initSearchListAC(response.items));
}

function* getListItemsAsync(action) {
  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}`,
  });

  yield put(initListItemsAC(response.items));
}

function* getCurrentItemAsync(action) {
  const item = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload}`,
  });

  yield put(initCurrentItemAC(item));
}

function* deleteItemAsync(action) {
  yield put(pendingResponseAC());

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload}`,
    headers: { 'Content-Type': 'Application/json' },
    method: 'DELETE',
  });

  if (response.success) {
    yield put(successResponseAC());
    yield put(deleteItemsAC(action.payload));
  } else {
    yield put(errorResponseAC());
  }
}

function* putItemAsync(action) {
  yield put(pendingResponseAC());
  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload.id}`,
    method: 'PUT',
    body: action.payload.item,
  });

  if (response.success) {
    yield put(successResponseAC());
    yield put(addItemsAC(response.item));
  } else {
    yield put(errorResponseAC());
  }

  yield put(updateItemsAC(response.item));
}

function* postItemAsync(action) {
  yield put(pendingResponseAC());
  const response = yield call(fetchData, {
    url: process.env.REACT_APP_ITEMS_URL,
    method: 'POST',
    body: action.payload,
  });

  if (response.success) {
    yield put(successResponseAC());
    yield put(addItemsAC(response.item));
  } else {
    yield put(errorResponseAC());
  }
}

function* getCategoryAsync(action) {
  const categories = yield call(fetchData, {
    url: `${process.env.REACT_APP_CATEGORIES_URL}${action.payload}`,
  });
  yield put(initCategoriesAC(categories));
}

function* getListsAsync() {
  const lists = yield call(fetchData, { url: process.env.REACT_APP_TYPES_URL });

  yield put(initListsAC(lists));
}

function* postOrderItemsAsync(action) {
  const newItem = yield call(fetchData, {
    url: process.env.REACT_APP_ORDER_URL,
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'POST',
    body: JSON.stringify(action.payload),
  });
}

function* getOrderListAsync(action) {
  const orders = yield call(fetchData, {
    url: process.env.REACT_APP_ORDER_URL,
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  yield put(initOrderListAC(orders));
}

function* getAnimalsAsync(action) {
  const animals = yield call(fetchData, {
    url: process.env.REACT_APP_ANIMALS_URL,
  });

  yield put(initAnimalsAC(animals));
}

function* deleteAnimalAsync(action) {
  yield put(pendingResponseAnimalAC());

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ANIMALS_URL}/${action.payload}`,
    headers: { 'Content-Type': 'Application/json' },
    method: 'DELETE',
  });

  if (response.success) {
    yield put(successResponseAnimalAC());
    yield put(deleteAnimalsAC(action.payload));
  } else {
    yield put(errorResponseAnimalAC());
  }
}

function* getReviewsAsync(action) {
  const reviews = yield call(fetchData, {
    url: `${process.env.REACT_APP_REVIEWS_URL}/${action.payload}`,
  });

  yield put(initReviewsAC(reviews));
}

function* getReviewsListAsync(action) {
  const reviews = yield call(fetchData, {
    url: process.env.REACT_APP_REVIEWS_URL,
  });

  yield put(setReviewsList(reviews));
}

function* postReviewAsync(action) {
  const newReview = yield call(fetchData, {
    url: `${process.env.REACT_APP_REVIEWS_URL}/${action.payload.item_id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer' + localStorage.getItem('token'),
    },
    body: JSON.stringify(action.payload),
  });

  yield put(createReviewAC(newReview));
}

function* deleteOrderAsync(action) {
  yield put(pendingResponseAC());

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ORDER_URL}/${action.payload}`,
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer' + localStorage.getItem('token'),
    },
    method: 'DELETE',
  });

  if (response.success) {
    yield put(successResponseAC());
    yield put(deleteOrderAC(action.payload));
  } else {
    yield put(errorResponseAC());
  }
}

function* postAnimalAsync(action) {
  yield put(pendingResponseAnimalAC());
  const response = yield call(fetchData, {
    url: process.env.REACT_APP_ANIMALS_URL,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    method: 'POST',
    body: action.payload,
  });

  if (response.success) {
    yield put(successResponseAnimalAC());
    yield put(addAnimalsAC(response.animal));
  } else {
    yield put(errorResponseAnimalAC());
  }
}

function* getRelativeItemsAsync(action) {
  const relativeItems = yield call(fetchData, {
    url: `${process.env.REACT_APP_RELATIVE_ITEMS_URL}/${action.payload}`,
  });
  yield put(initRelativeItemsAC(relativeItems));
}

function* toPublicAnimalAsync(action) {
  yield put(pendingResponseAC());
  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_ANIMALS_URL}/${action.payload}`,
    method: 'PUT',
  });

  if (response.success) {
    yield put(successResponseAnimalAC());
    yield put(publicAnimalsAC(response.id));
  } else {
    yield put(errorResponseAnimalAC());
  }
}

function* getCurrentAnimalsAsync(action) {
  const currentAnimal = yield call(fetchData, {
    url: `${process.env.REACT_APP_ANIMALS_URL}/${action.payload}`,
  });
  yield put(initCurrentAnimalAC(currentAnimal));
}

function* getUserAnimalsAsync() {
  const userAnimals = yield call(fetchData, {
    url: routesApi.useranimals,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  yield put(initUserAnimalsAC(userAnimals));
}

function* getUserOrdersAsync(action) {
  const userOrder = yield call(fetchData, {
    url: routesApi.userorder,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  yield put(initUserOrderAC(userOrder));
}

function* deleteReviewAsync(action) {
  yield put(pendingResponseReviewAC());

  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_REVIEWS_URL}/${action.payload}`,
    headers: { 'Content-Type': 'Application/json' },
    method: 'DELETE',
  });

  if (response.success) {
    yield put(successResponseReviewAC());
    yield put(deleteReviewsAC(action.payload));
  } else {
    yield put(errorResponseReviewAC());
  }
}

function* toPublicReviewAsync(action) {
  yield put(pendingResponseReviewAC());
  const response = yield call(fetchData, {
    url: `${process.env.REACT_APP_REVIEWS_URL}/${action.payload}`,
    method: 'PUT',
  });

  if (response.success) {
    yield put(successResponseReviewAC());
    yield put(publicReviewsAC(response.id));
  } else {
    yield put(errorResponseReviewAC());
  }
}

export function* globalWatcher() {
  yield takeEvery('FETCH_GET_ITEMS', getItemsAsync);
  yield takeEvery('FETCH_GET_CURRENT_ITEM', getCurrentItemAsync);
  yield takeEvery('FETCH_DELETE_ITEM', deleteItemAsync);
  yield takeEvery('FETCH_PUT_ITEM', putItemAsync);
  yield takeEvery('FETCH_POST_ITEM', postItemAsync);
  yield takeEvery('FETCH_GET_CATEGORY', getCategoryAsync);
  yield takeEvery('FETCH_GET_LISTS', getListsAsync);
  yield takeEvery('FETCH_POST_ORDER_ITEMS', postOrderItemsAsync);
  yield takeEvery('FETCH_CREATE_USER', postUserAsync);
  yield takeEvery('FETCH_GET_ITEM_LIST', getListItemsAsync);
  yield takeEvery('FETCH_LOGIN_USER', loginUserAsync);
  yield takeEvery('FETCH_GET_ANIMALS', getAnimalsAsync);
  yield takeEvery('FETCH_GET_CURRENT_ANIMAL', getCurrentAnimalsAsync);
  yield takeEvery('FETCH_GET_REVIEWS', getReviewsAsync);
  yield takeEvery('FETCH_POST_REVIEW', postReviewAsync);
  yield takeEvery('FETCH_GET_ORDER_LIST', getOrderListAsync);
  yield takeEvery('FETCH_DELETE_ORDER', deleteOrderAsync);
  yield takeEvery('FETCH_GET_SEARCH_LIST', getSearchListAsync);
  yield takeEvery('FETCH_POST_ANIMAL', postAnimalAsync);
  yield takeEvery('FETCH_RELATIVE_ITEMS', getRelativeItemsAsync);
  yield takeEvery('FETCH_DELETE_ANIMAL', deleteAnimalAsync);
  yield takeEvery('FETCH_CHECK_ANIMAL', toPublicAnimalAsync);
  yield takeEvery('FETCH_GET_USER_ANIMALS', getUserAnimalsAsync);
  yield takeEvery('FETCH_GET_USER_ORDER', getUserOrdersAsync);
  yield takeEvery('FETCH_PUT_PROFILE', putUserAsync);
  yield takeEvery('FETCH_GET_REVIEWS_LIST', getReviewsListAsync);
  yield takeEvery('FETCH_DELETE_REVIEW', deleteReviewAsync);
  yield takeEvery('FETCH_CHECK_REVIEW', toPublicReviewAsync);
}
