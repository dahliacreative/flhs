import React, { useEffect } from 'react'

const LinkPreview = ({ url }) => {
  useEffect(() => {
    fetch('/.netlify/functions/scraper', {
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify({
        url
      })
    })
      .then(r => r.json())
      .then(r => console.log(r))
  })
  return <p>Link</p>
}

export default LinkPreview
