import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reducer from './Store/Reducers/burgerReducer';
import orderReducers from './Store/Reducers/orderReducer';
import authReducer from './Store/Reducers/authReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  burgerBuilder: reducer,
  order: orderReducers,
  auth: authReducer
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
}
const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  // Connecting react to redux
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
