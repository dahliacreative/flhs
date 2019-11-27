import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'pages/App'

fetch('./netlify/functions/deleteTag', {
  method: 'POST',
  body: JSON.stringify({
    tagId: '1laRohRI3AZ3HpzeRsPNDx',
    recordId: '3gXFvCCrIwRFAuRQobTToe'
  })
})

ReactDOM.render(<App />, document.getElementById('root'))
