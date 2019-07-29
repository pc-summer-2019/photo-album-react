import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'normalize.css/normalize.css'
import '../styles/App.css'

import Home from './Home'
import Album from './Album'
import Photo from './Photo'

const App = (props) => (
  <Router>
    <div id="container">
      <Route exact path="/" component={Home} />
      <Route path="/album/:id" component={Album} />
      <Route path="/photo/:id" component={Photo} />
    </div>
  </Router>
)

export default App