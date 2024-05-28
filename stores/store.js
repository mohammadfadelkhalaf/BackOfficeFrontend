import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducers from '@/reducers/index.js';
// import {createWrapper} from "next-redux-wrapper";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  rootReducers,
  initialState,
  compose(applyMiddleware(...middleware)),
  // +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;