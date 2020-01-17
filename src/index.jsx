import React, { useState, useRef, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Brand from './Brand'
import Hamburger from './Hamburger'
import Links from './Links'

import ThemeContext, { defaultTheme } from './styleContext'
import { NavLinkProp, ThemeProps } from './propTypes'
import useScrollSlide from './useScrollSlide'

const Navbar = props => {
  const navRef = useRef(null)

  const theme = useContext(ThemeContext)
  const isHidden = useScrollSlide(navRef)
  const [isToggled, toggle] = useState(false)

  const onMenuClick = () => toggle(!isToggled)

  return (
    <ThemeContext.Provider value={defaultTheme}>
      <Nav
        data-background={theme.backgroundColor}
        data-hidden={isHidden}
        color={theme.mainColor}
        ref={navRef}
      >
        <Brand route="/" brand={props.brand} color={theme.mainColor} />

        <Hamburger
          mainColor={theme.mainColor}
          barColor={theme.linkColor}
          onToggle={onMenuClick}
        />

        <Links
          isOpen={isToggled}
          infoLinks={props.infoLinks}
          authLinks={props.authLinks}
          nonAuthLinks={props.nonAuthLinks}
          mainColor={theme.mainColor}
        />
      </Nav>
    </ThemeContext.Provider>
  )
}

Navbar.propTypes = {
  brand: PropTypes.string.isRequired,
  infoLinks: PropTypes.arrayOf(NavLinkProp),
  nonAuthLinks: PropTypes.arrayOf(NavLinkProp),
  authLinks: PropTypes.arrayOf(NavLinkProp),
  theme: ThemeProps
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: ${props => props['data-background']};
  font-family: 'Work Sans', sans-serif;
  height: 55px;
  padding: 0 2em;
  position: fixed;
  top: ${props => (props['data-hidden'] ? '-55px' : 0)};
  right: 0;
  left: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transition: ${props =>
    props['data-hidden'] ? 'top 300ms ease-out' : 'top 200ms ease-in'};
  z-index: 2;

  & * {
    outline-color: ${props => props.color};
  }

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`

export default Navbar
