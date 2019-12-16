import React from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { hooks } from 'settings'
import Container from 'components/Container'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Banner from 'components/Banner'
import { constants } from 'settings'

const query = gql`
  query Town($content: ImageTransformOptions!) {
    contentPage(id: "63JlWL1XlnCVyvz9GvAJ9s") {
      title
      content {
        json
        links {
          assets {
            block {
              url(transform: $content)
              title
              sys {
                id
              }
            }
          }
        }
      }
    }
  }
`

const Town = () => {
  hooks.useMeta('FLHS :: The Town')
  const { data, error, loading } = useQuery(query, {
    variables: {
      content: constants.CONTENT_IMAGE_DIMENSIONS
    }
  })
  return (
    <>
      <Banner id="3RlsX7hbYApvYyxHmzmB9D" />
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
                  <div className="generic">
                    <h1>A brief history of Finedon</h1>
                  </div>
                  <div
                    className="generic"
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(data.contentPage.content.json, {
                        renderNode: {
                          'embedded-asset-block': node => {
                            const asset = data.content.links.assets.block.find(
                              a => a.sys.id === node.data.target.sys.id
                            )
                            return `<img class="fluid" src="${asset.url}" alt="${asset.title}" />`
                          }
                        }
                      })
                    }}
                  />
                </>
              )}
            </>
          )}
        </Container>
      </main>
    </>
  )
}

export default Town
