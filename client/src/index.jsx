import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {reducer} from './redux/reducer';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'),
);
