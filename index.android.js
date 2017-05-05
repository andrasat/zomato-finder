/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import App from './src'
import reducers from './src/reducers'

const middlewares = [thunk, logger]

const store = createStore(reducers, applyMiddleware(middlewares))

class ZomatoFinder extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ZomatoFinder', () => ZomatoFinder);
