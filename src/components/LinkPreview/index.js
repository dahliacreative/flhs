import React, { useEffect } from 'react'

const LinkPreview = ({ url }) => {
  useEffect(() => {
    fetch('/.netlify/functions/scraper', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    })
      .then(r => r.json())
      .then(r => {
        console.log(r)
      })
      .catch(e => console.log(e))
  })
  return <p>Link</p>
}

export default LinkPreview
