import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Layout } from '~/core'
import { Home } from '~/pages'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    </Switch>
  </BrowserRouter>
)

export default Routes
