/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RootStack from './src/Root';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers/root.reducer'

import {createLogger} from 'redux-logger';

const middlewares = [thunk];

const logger = createLogger()
middlewares.push(logger)

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default class App extends Component {  
  render() {  
    return (  
      <Provider store={store}>
          <RootStack />  
      </Provider>
    );  
  }  
}