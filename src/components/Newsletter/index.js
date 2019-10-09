import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'

const NewsletterFragment = gql`
    fragment NewsletterFragment on Newsletter {
        title
        upload {
            url
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
            url: require('images/placeholder-pdf.jpg')
        }
    }
    return (
        <Card {...data}>
            <Card.Link href={props.upload.url} target="_blank" rel="noopener noreferrer" download>
                <Card.Image />
                <Card.Title />
            </Card.Link>
        </Card>
    )
}

export default Newsletter
export { NewsletterFragment }
