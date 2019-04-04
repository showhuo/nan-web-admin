import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

export default function CoreRouter() {
  return (
    <Switch>
      <Route component={lazyloader('demo')} path="/demo" />
      <Route component={lazyloader('login')} path="/login" />
      <Route component={lazyloader('check-in-home')} path="/check-in-home" />
      <Route
        component={lazyloader('check-in-config')}
        path="/check-in-config"
      />
      <Route component={lazyloader('lottery-home')} path="/lottery-home" />
      <Route component={lazyloader('lottery-result')} path="/lottery-result" />
      <Route component={lazyloader('lottery-steps')} path="/lottery-steps" />
      <Redirect to="/login" />
    </Switch>
  )
}
