import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { gql } from 'apollo-boost'
import dayjs from 'dayjs'
import { DiscussionEmbed } from 'disqus-react'
import { constants, hooks } from 'settings'
import { EventFragment } from 'components/Event'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Banner from 'components/Banner'
import styles from './styles.module.sass'

const query = gql`
  ${EventFragment}
  query Event($id: String!, $transform: ImageTransformOptions!, $content: ImageTransformOptions!) {
    event(id: $id) {
      ...EventFragment
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

const Event = ({ match, history }) => {
  const [title, updateTitle] = useState('FLHS :: Event')
  hooks.useMeta(title)
  const {
    loading,
    error,
    data: { event }
  } = useQuery(query, {
    variables: {
      id: match.params.id,
      transform: constants.BANNER_IMAGE_DIMENSIONS,
      content: constants.CONTENT_IMAGE_DIMENSIONS
    },
    onCompleted: data => {
      updateTitle(`FLHS :: Events :: ${data.event.title}`)
    }
  })
  hooks.useMeta(title)
  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.poster}>
                <img src={event.banner.url} />
                <div className={styles.titles}>
                  <h1>{event.title}</h1>
                  <p>{event.speaker}</p>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(event.content.json, {
                      renderNode: {
                        'embedded-asset-block': node => {
                          const asset = event.content.links.assets.block.find(a => a.sys.id === node.data.target.sys.id)
                          return `<img class="fluid" src="${asset.url}" alt="${asset.title}" />`
                        }
                      }
                    })
                  }}
                />
                <div className={styles.details}>
                  <div>
                    <h3>When</h3>
                    <p>
                      {dayjs(event.date)
                        .utc()
                        .format('ddd DD MMM YYYY, hh:mma')}
                    </p>
                  </div>
                  <div>
                    <h3>Where</h3>
                    <p>{event.location}</p>
                  </div>
                  <div>
                    <h3>Cost</h3>
                    <p>
                      <b>FLHS Members:</b> £{parseFloat(event.membersPrice).toFixed(2)}
                      <br />
                      <b>Non-members:</b> £{parseFloat(event.nonMembersPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Event
