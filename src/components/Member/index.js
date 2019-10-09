import React from 'react'
import { gql } from 'apollo-boost'
import Card from 'components/Card'

const MemberFragment = gql`
    fragment MemberFragment on CommitteeMember {
        name
        biography
        email
        telephone
        role
        photo {
            url(transform: $transform)
        }
        sys {
            id
        }
    }
`

const Member = props => {
    const data = {
        title: props.name,
        image: props.photo || {
            url: require('images/placeholder-member.jpg')
        }
    }
    return (
        <Card {...data}>
            <Card.Image />
            <Card.Title />
            <p>{props.role}</p>
        </Card>
    )
}

export default Member
export { MemberFragment }
