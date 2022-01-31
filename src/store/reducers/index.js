import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import roomReducer from './roomReducer';

const reducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  room: roomReducer,
  message: messageReducer,
})

export default reducer;