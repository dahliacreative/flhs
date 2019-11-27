import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'pages/App'
import uuid from 'uuid'

let userId = localStorage.getItem('user')
if (!userId) {
  localStorage.setItem(uuid())
}

ReactDOM.render(<App />, document.getElementById('root'))
