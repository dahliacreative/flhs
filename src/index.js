import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'pages/App'

fetch('/.netlify/functions/tag', {
  method: 'POST',
  body: JSON.stringify({
    recordId: '3gXFvCCrIwRFAuRQobTToe',
    title: 'test',
    tagData: {
      hello: 'world'
    }
  })
}).then(res => console.log(res))

ReactDOM.render(<App />, document.getElementById('root'))
