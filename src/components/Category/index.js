import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'

const CategoryFragment = gql`
    fragment CategoryFragment on Category {
        title
        image {
            url(transform: $transform)
        }
        sys {
            id
        }
    }
`

const Category = props => (
    <Card {...props}>
        <Card.Link to={{ pathname: '/archives', search: `category=${props.sys.id}` }}>
            <Card.Image />
            <Card.Title />
        </Card.Link>
    </Card>
)

export default Category
export { CategoryFragment }
