import React from 'react'
import { render } from 'react-dom'

import { StyleProvider } from '~/core'
import Routes from '~/routes'

const element = document.getElementById('root')

render(
  <StyleProvider>
    <Routes />
  </StyleProvider>,
  element
)
