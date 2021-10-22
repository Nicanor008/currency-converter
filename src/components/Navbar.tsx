import { Container, UnorderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

export const Navbar: React.FC = () => (
  <Container maxW="container.xl" display="flex" justifyContent="space-between">
    <NavLink to="/" className="brand-logo">
      Currency Exchanger
    </NavLink>
    <UnorderedList display="flex" width="200px" justifyContent="space-evenly" listStyleType="none">
      <ListItem><NavLink to="/">Home</NavLink></ListItem>
      <ListItem><NavLink to="/about">About</NavLink></ListItem>
      <ListItem><ColorModeSwitcher justifySelf="flex-end" /></ListItem>
      {/* <ListItem><ColorModeScript /></ListItem> */}
    </UnorderedList>
    {/* <ul className="right hide-on-med-and-down">
      <li cy-data="home-nav-link">
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <ColorModeScript />
    </ul> */}
  </Container>
)
