import React from 'react'
import ReactGA from 'react-ga'
import { gql } from 'apollo-boost'
import Card from 'components/Card'

const NewsletterFragment = gql`
  fragment NewsletterFragment on Newsletter {
    title
    upload {
      url
    }
    cover {
      url(transform: $transform)
    }
    sys {
      id
    }
  }
`

const Newsletter = props => {
  const data = {
    title: props.title,
    image: {
      url: props.cover ? props.cover.url : require('images/placeholder-pdf.jpg')
    }
  }
  return (
    <Card {...data}>
      <Card.Link
        onClick={() => {
          ReactGA.event({
            category: 'Newsletter',
            action: 'Download',
            label: data.title
          })
        }}
        href={props.upload.url}
        target="_blank"
        rel="noopener noreferrer"
        download
      >
        <Card.Image />
        <Card.Title />
      </Card.Link>
    </Card>
  )
}

export default Newsletter
export { NewsletterFragment }
