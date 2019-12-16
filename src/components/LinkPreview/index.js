import React, { useEffect } from 'react'

const LinkPreview = ({ url }) => {
  useEffect(() => {
    fetch('/.netlify/functions/scraper', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    }).then(r => console.log(r.body))
  })
  return <p>Link</p>
}

export default LinkPreview
