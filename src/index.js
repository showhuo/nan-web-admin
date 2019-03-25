import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './init'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import CoreRouter from './router'
import createStore from './store/create'
import history from './utils/history'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CoreRouter} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
