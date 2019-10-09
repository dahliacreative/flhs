import React from 'react'
import { gql } from 'apollo-boost'
import { constants } from 'settings'
import Card from 'components/Card'
import { CommentCount } from 'disqus-react'

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
                <Card.CommentCount>
                    <CommentCount
                        shortname={constants.DISQUS_SHORTNAME}
                        config={{
                            identifier: props.sys.id,
                            url: `${window.location.origin}/events/${props.sys.id}`,
                            title: props.title
                        }}
                    />
                </Card.CommentCount>
                <Card.Title />
                <Card.Date live format="ddd DD MMM YYYY - HH:mm" />
            </Card.Link>
        </Card>
    )
}

export default Event
export { EventFragment }
