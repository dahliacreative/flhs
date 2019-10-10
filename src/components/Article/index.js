import React from 'react'
import { gql } from 'apollo-boost'
import { constants } from 'settings'
import Card from 'components/Card'
import { CommentCount } from 'disqus-react'

const ArticleFragment = gql`
    fragment ArticleFragment on Article {
        title
        author {
            name
            avatar {
                url(transform: $avatar)
            }
        }
        banner {
            url(transform: $transform)
        }
        sys {
            id
            firstPublishedAt
        }
    }
`

const Article = props => {
    const data = {
        image: props.banner,
        title: props.title,
        sys: {
            id: props.sys.id,
            firstPublishedAt: props.sys.firstPublishedAt
        }
    }
    return (
        <Card {...data}>
            <Card.Link to={`/news/${props.sys.id}`}>
                <Card.Image />
                <Card.CommentCount>
                    <CommentCount
                        shortname={constants.DISQUS_SHORTNAME}
                        config={{
                            identifier: props.sys.id,
                            url: `${window.location.origin}/news/${props.sys.id}`,
                            title: props.title
                        }}
                    />
                </Card.CommentCount>
                <Card.Title />
                <Card.Date />
            </Card.Link>
        </Card>
    )
}

export default Article
export { ArticleFragment }
