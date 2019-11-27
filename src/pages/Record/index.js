import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import cx from 'classnames'
import Annotation from 'react-image-annotation'
import { DiscussionEmbed } from 'disqus-react'
import { constants, hooks } from 'settings'
import { RecordFragment } from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'
import { useBreakpoints } from 'react-device-breakpoints'
import { Delete } from '@material-ui/icons'
import uuid from 'uuid'

const query = gql`
  ${RecordFragment}
  query Record($id: String!, $transform: ImageTransformOptions!) {
    record(id: $id) {
      ...RecordFragment
      description
      year
      credit
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
  const [annotation, setAnnotation] = useState({})
  const [title, updateTitle] = useState('FLHS :: Archive')
  const [isLoaded, setLoaded] = useState(false)
  const device = useBreakpoints()
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
  const saveTag = tag => {
    fetch('/.netlify/functions/tag', {
      method: 'POST',
      body: JSON.stringify({
        title: tag.data.text,
        recordId: record.sys.id,
        tagData: {
          geometry: tag.geometry,
          data: {
            ...tag.data,
            id: uuid()
          }
        }
      })
    }).then(refetch)
  }
  const deleteTag = id => {
    const tag = record.imageTagsCollection.items.find(t => t.tagData.data.id === id)
    fetch('/.netlify/functions/deleteTag', {
      method: 'POST',
      body: JSON.stringify({
        recordId: record.sys.id,
        tagId: tag.sys.id
      })
    }).then(refetch)
  }
  useEffect(() => {
    setAnnotation({})
  }, [record])
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
                <div className={cx([styles.attachment, isLoaded && styles.show])}>
                  <Annotation
                    src={record.attachment.url}
                    alt={record.title}
                    value={annotation}
                    onChange={a => setAnnotation(a)}
                    onSubmit={saveTag}
                    disableSelector={device.isTouchDevice}
                    disableEditor={device.isTouchDevice}
                    disableOverlay
                    annotations={record.imageTagsCollection.items.map(t => t.tagData)}
                    renderHighlight={({ key, annotation }) => (
                      <div
                        key={key}
                        className={styles.highlight}
                        style={{
                          left: `${annotation.geometry.x}%`,
                          top: `${annotation.geometry.y}%`,
                          width: `${annotation.geometry.width}%`,
                          height: `${annotation.geometry.height}%`
                        }}
                      >
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this tag?')) {
                              deleteTag(annotation.data.id)
                            }
                          }}
                        >
                          <Delete />
                        </button>
                      </div>
                    )}
                    renderContent={({ key, annotation }) => (
                      <div
                        key={key}
                        className={styles.content}
                        style={{
                          left: `${annotation.geometry.x + annotation.geometry.width / 2}%`,
                          top: `${annotation.geometry.y + annotation.geometry.height}%`
                        }}
                      >
                        {annotation.data.text}
                      </div>
                    )}
                  />
                  <img
                    src={record.attachment.url}
                    alt={record.title}
                    className={cx([styles.image, styles.hide])}
                    onLoad={() => setLoaded(true)}
                  />
                  <a
                    onClick={() => {
                      ReactGA.event({
                        category: 'Archive',
                        action: 'Download',
                        label: record.sys.id
                      })
                    }}
                    className={styles.download}
                    href={record.attachment.url.split('?')[0]}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Image
                  </a>
                  {!device.isTouchDevice && <p className={styles.overlay}>Click and drag to tag</p>}
                </div>
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
