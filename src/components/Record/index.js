import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'
import { CommentCount } from 'disqus-react'
import { constants } from 'settings'

const RecordFragment = gql`
    fragment RecordFragment on Record {
        title
        attachment {
            url(transform: $transform)
            contentType
        }
        categoryCollection {
            items {
                title
                sys {
                    id
                }
            }
        }
        sys {
            id
            firstPublishedAt
        }
    }
`

const Record = ({ location, hideCategories, categoryClick, ...props }) => (
    <Card {...props}>
        <Card.Link to={`/archives/records/${props.sys.id}`}>
            <Card.CommentCount>
                <CommentCount
                    shortname={constants.DISQUS_SHORTNAME}
                    config={{
                        identifier: props.sys.id,
                        url: `${window.location.origin}/archives/records/${props.sys.id}`,
                        title: props.title
                    }}
                />
            </Card.CommentCount>
            {props.attachment.contentType.includes('image') ? <Card.Image /> : 'Attachment'}
            <Card.Header>
                <Card.Title />
                <Card.Date />
            </Card.Header>
        </Card.Link>
        {!hideCategories &&
            props.categoryCollection.items.map(c => (
                <Card.Tag
                    title={c.title}
                    key={`${props.sys.id}-${c.title}`}
                    onClick={() => categoryClick({ value: c.sys.id })}
                />
            ))}
    </Card>
)

export default Record
export { RecordFragment }
