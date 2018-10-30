import React from 'react'

import {Navbar, AllLocations} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllLocations />
    </div>
  )
}

export default App
