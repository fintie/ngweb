import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import Reducers
import fetch from './reducers/fetchReducer';
import team from './reducers/teamReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  fetch,
  team,
  routing: routerReducer
});
