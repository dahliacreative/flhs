import React, { useEffect } from 'react'

const LinkPreview = ({ url }) => {
  useEffect(() => {
    fetch('/.netlify/functions/scraper', {
      method: 'POST',
      body: JSON.stringify({
        url
      })
    })
      .then(r => JSON.parse(r))
      .then(r => {
        console.log(r)
      })
  })
  return <p>Link</p>
}

export default LinkPreview
