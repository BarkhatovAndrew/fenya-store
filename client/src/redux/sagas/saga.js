import { call, put, takeEvery } from 'redux-saga/effects';
import {
  initItemsAC,
  deleteItemsAC,
  updateItemsAC,
  addItemsAC,
  initCategoriesAC,
  initCurrentItemAC,
} from '../actionCreators/itemsAC';
import { initListsAC } from '../actionCreators/listsAC';

async function fetchData({ url, method, headers, body }) {
  const response = await fetch(url, { method, headers, body });
  return await response.json();
}

function* getItemsAsync(action) {
  const items = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload.type}/${action.payload.category}`,
  });

  yield put(initItemsAC(items));
}

function* getCurrentItemAsync(action) {
  const item = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload}`,
  });

  yield put(initCurrentItemAC(item));
}

function* deleteItemAsync(action) {
  const id = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload}`,
    headers: { 'Content-Type': 'Application/json' },
    method: 'DELETE',
  });

  yield put(deleteItemsAC(id));
}

function* putItemAsync(action) {
  const updatedItem = yield call(fetchData, {
    url: `${process.env.REACT_APP_ITEMS_URL}/${action.payload.id}`,
    headers: { 'Content-Type': 'Application/json' },
    method: 'PUT',
    body: JSON.stringify(action.payload),
  });

  yield put(updateItemsAC(updatedItem));
}

function* postItemAsync(action) {
  const newItem = yield call(fetchData, {
    url: process.env.REACT_APP_ITEMS_URL,
    method: 'POST',
    body: action.payload,
  });

  yield put(addItemsAC(newItem));
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

export function* globalWatcher() {
  yield takeEvery('FETCH_GET_ITEMS', getItemsAsync);
  yield takeEvery('FETCH_GET_CURRENT_ITEM', getCurrentItemAsync);
  yield takeEvery('FETCH_DELETE_ITEM', deleteItemAsync);
  yield takeEvery('FETCH_PUT_ITEM', putItemAsync);
  yield takeEvery('FETCH_POST_ITEM', postItemAsync);
  yield takeEvery('FETCH_GET_CATEGORY', getCategoryAsync);
  yield takeEvery('FETCH_GET_LISTS', getListsAsync);
}
