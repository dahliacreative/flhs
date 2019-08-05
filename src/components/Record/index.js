import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'
import qs from 'query-string'

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
        <Card.Link
            to={{
                pathname: location.pathname,
                search: qs.stringify({ ...qs.parse(location.search), record: props.sys.id })
            }}
        >
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
