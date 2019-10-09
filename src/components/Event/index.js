import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'

const EventFragment = gql`
    fragment EventFragment on Event {
        title
        date
        banner {
            url(transform: $transform)
        }
        sys {
            id
        }
    }
`

const Event = props => {
    const data = {
        image: props.banner,
        title: props.title,
        sys: {
            id: props.sys.id,
            firstPublishedAt: props.date
        }
    }
    return (
        <Card {...data}>
            <Card.Link to={`/events/${props.sys.id}`}>
                <Card.Image />
                <Card.Title />
                <Card.Date live format="ddd DD MMM YYYY - HH:mm" />
            </Card.Link>
        </Card>
    )
}

export default Event
export { EventFragment }
