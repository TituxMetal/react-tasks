import React from 'react'
import { Link } from 'react-router-dom'

import Ui from './ui'

const Footer = ({ footerText }) => (
  <Ui.Bar as='footer'>
    <Ui.Wrapper>
      <Ui.Text $centered>{footerText}</Ui.Text>
    </Ui.Wrapper>
  </Ui.Bar>
)

const Header = ({ siteTitle }) => (
  <Ui.Bar as='header'>
    <Ui.Wrapper>
      <Ui.Text as={Link} to='/' $brand>
        {siteTitle}
      </Ui.Text>
    </Ui.Wrapper>
  </Ui.Bar>
)

const Layout = ({ children }) => (
  <Ui>
    <Header siteTitle='React Tasks' />
    <Ui.Main>{children}</Ui.Main>
    <Footer footerText='Created with love and lots of coffee' />
  </Ui>
)

export default Layout
