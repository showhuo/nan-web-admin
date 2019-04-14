import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './init'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import CoreRouter from './router'
import createStore from './store/create'
import history from './utils/history'
import withLayout from './utils/with-layout'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const store = createStore()

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={CoreRouter} />
          <Route path="/" component={withLayout(CoreRouter)} />
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
