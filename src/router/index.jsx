import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

export default function CoreRouter() {
  return (
    <Switch>
      <Route component={lazyloader('demo')} path="/demo" />
      <Route component={lazyloader('login')} path="/login" />
      <Route component={lazyloader('check-in')} path="/check-in" />
      <Route
        component={lazyloader('check-in-config')}
        path="/check-in-config"
      />
      <Redirect to="/login" />
    </Switch>
  )
}
