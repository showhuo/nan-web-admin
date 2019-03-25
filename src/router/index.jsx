import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

export default function CoreRouter() {
  return (
    <Switch>
      <Route component={lazyloader('demo')} path="/demo" />
      <Redirect to="/demo" />
    </Switch>
  )
}
