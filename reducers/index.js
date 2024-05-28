// reducers.js
import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import cartReducer from "./cartReducer"

const rootReducers = combineReducers({
  chatReducer,
  cartReducer,
});
export default rootReducers;