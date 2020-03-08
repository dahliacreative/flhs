import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { DiscussionEmbed } from 'disqus-react'
import { constants, hooks } from 'settings'
import { RecordFragment } from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'

import Image from './image'
import PDF from './pdf'

const query = gql`
  ${RecordFragment}
  query Record($id: String!, $transform: ImageTransformOptions!) {
    record(id: $id) {
      ...RecordFragment
      description
      year
      credit
      pdf {
        url
      }
      carouselCollection {
        items {
          url(transform: $transform)
          contentType
          fileName
          sys {
            id
          }
        }
      }
      imageTagsCollection {
        items {
          tagData
          sys {
            id
          }
        }
      }
    }
  }
`

const Record = ({ match, history }) => {
  const [title, updateTitle] = useState('FLHS :: Archive')
  hooks.useMeta(title)
  const {
    loading,
    error,
    refetch,
    data: { record }
  } = useQuery(query, {
    variables: {
      id: match.params.id,
      transform: constants.RECORD_IMAGE_DIMENSIONS
    },
    onCompleted: data => {
      updateTitle(`FLHS :: Archive :: ${data.record.title}`)
    }
  })

  hooks.useMeta(title)

  return (
    <main className="no-banner">
      <Container light pad>
        {error ? (
          <Error error={error} />
        ) : (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Button onClick={() => history.goBack()}>Back to archives</Button>
                {record.pdf && record.pdf.url ? (
                  <PDF record={record} />
                ) : (
                  <>
                    {record.carouselCollection.items.length > 0 ? (
                      <div>Carousel</div>
                    ) : (
                      <Image record={record} refetch={refetch} attachment={record.attachment} />
                    )}
                  </>
                )}
                <h1 className={styles.title}>{record.title}</h1>
                <p className={styles.date}>
                  {record.year ? record.year : 'Year unknown'} Credit {record.credit ? record.credit : 'unknown'}
                </p>
                <p className={styles.description}>{record.description}</p>
                <div className="generic wide">
                  <div className={styles.comments}>
                    <DiscussionEmbed
                      shortname={constants.DISQUS_SHORTNAME}
                      config={{
                        url: `${window.location.origin}/archives/records/${record.sys.id}`,
                        identifier: record.sys.id,
                        title: record.title
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Container>
    </main>
  )
}

export default Record
