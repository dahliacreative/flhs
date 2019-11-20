import React from 'react'
import { hooks } from 'settings'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Container from 'components/Container'
import Banner from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import { ReactTinyLink } from 'react-tiny-link'

const query = gql`
  query Links {
    linkCategoryCollection(order: sys_firstPublishedAt_ASC) {
      items {
        title
        linkedFrom {
          linkCollection {
            items {
              url
            }
          }
        }
      }
    }
  }
`

const Links = () => {
  hooks.useMeta('FLHS :: Links')
  const { loading, error, data } = useQuery(query)
  return (
    <>
      <Banner id="6qlhFAfsIqSvAonV48bYli" />
      <main>
        <Container light pad>
          {error ? (
            <Error error={error} />
          ) : (
            <>
              {loading ? (
                <Loading />
              ) : (
                <>
                  {data.linkCategoryCollection.items.map(c => (
                    <div className="generic" key={c.title}>
                      <h3>{c.title}</h3>
                      {c.linkedFrom.linkCollection.items.map(l => (
                        <div style={{ marginBottom: 10 }} key={l.url}>
                          <ReactTinyLink url={l.url} />
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  )
}

export default Links
