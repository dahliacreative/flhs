import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from 'pages/App'
import uuid from 'uuid'

let userId = localStorage.getItem('user')
if (!userId) {
  localStorage.setItem('user', uuid())
}

ReactDOM.render(
  <Router>
    <Route component={App} path="/" />
  </Router>,
  document.getElementById('root')
)
