import React from "react";
import ReactDOM from 'react-dom';
import App from './containers/AppContainer';
import routes from './routes';
import store, { history } from './createStore';
import "assets/scss/next-genius.css";
// import registerServiceWorker from './registerServiceWorker';

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <App store={store} routes={routes(history)} />,
    MOUNT_NODE
  );
};

// This code is excluded from production bundle
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Development render functions
    const renderApp = render;

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept();
  }
}

// ========================================================
// Go!
// ========================================================
render();

// SW
// registerServiceWorker();
