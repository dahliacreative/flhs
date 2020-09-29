import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { constants, hooks } from 'settings'
import { gql } from 'apollo-boost'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Publication from 'components/Publication'

const query = gql`
  query Publications($transform: ImageTransformOptions!) {
    publicationCollection(order: title_ASC) {
      items {
        title
        author
        orderContactName
        orderContactEmail
        price
        description {
          json
        }
        banner {
          url(transform: $transform)
        }
        sys {
          id
        }
      }
    }
  }
`

const Publications = () => {
  hooks.useMeta('FLHS :: Society :: Publications')
  const { loading, error, data } = useQuery(query, {
    variables: { transform: constants.PUBLICATION_IMAGE_DIMENSIONS }
  })
  return (
    <Container light pad>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {data.publicationCollection.items.map(publication => (
                <Publication {...publication} key={publication.sys.id} />
              ))}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Publications
