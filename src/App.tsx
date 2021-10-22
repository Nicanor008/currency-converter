import { Container } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { HomePAge } from './pages/home'
import { About } from './pages/About'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxW="container.xl">
        <Switch>
          <Route path="/" component={HomePAge} exact />
          <Route path="/about" component={About} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
