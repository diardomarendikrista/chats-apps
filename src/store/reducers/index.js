import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

const reducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  message: messageReducer,
})

export default reducer;