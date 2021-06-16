import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from './views'

import './styles/global.scss'
import './styles/app.scss'

const App = (): React.ReactElement => {
  return (
    <Router>
      <Switch>
        <Home.Component />
      </Switch>
    </Router>
  )
}

export default App
