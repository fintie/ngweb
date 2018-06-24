import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createBrowserHistory from 'history/createBrowserHistory';
import rootReducer from './rootReducer';

export const history = createBrowserHistory();

const initialState = {
};
// ======================================================
// Middleware Configuration
// ======================================================
const middleware = [thunk, routerMiddleware(history)];

// ======================================================
// Store Enhancers
// ======================================================

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension;
  }
}

// ======================================================
// Store Instantiation and HMR Setup
// ======================================================
export const configureStore = () => createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

const store = configureStore();

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const reducers = require('./rootReducer').default;
    store.replaceReducer(reducers);
  });
}

export default store;
