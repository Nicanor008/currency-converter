import { Container, UnorderedList, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
// import { ColorModeSwitcher } from '../ColorModeSwitcher'

export const Navbar: React.FC = () => (
  <Container maxW="container.xl" display="flex" justifyContent="space-between">
    <NavLink to="/" className="brand-logo">
      Currency Exchanger
    </NavLink>
    <UnorderedList display="flex" width="200px" justifyContent="space-evenly" listStyleType="none">
      <ListItem><NavLink to="/">Home</NavLink></ListItem>
      <ListItem><NavLink to="/about">About</NavLink></ListItem>
      {/* I've disabled the light/dark mode switcher for now, it interferes with the history mapping data */}
      {/* <ListItem><ColorModeSwitcher justifySelf="flex-end" /></ListItem> */}
    </UnorderedList>
    
  </Container>
)
