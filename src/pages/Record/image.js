import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga'
import cx from 'classnames'
import Annotation from 'react-image-annotation'
import { Delete } from '@material-ui/icons'
import { useBreakpoints } from 'react-device-breakpoints'
import uuid from 'uuid'
import styles from './styles.module.sass'

const Image = ({ record, refetch, attachment }) => {
  const [annotation, setAnnotation] = useState({})
  const [saving, save] = useState(false)
  const [deleting, deletion] = useState(false)
  const [isLoaded, setLoaded] = useState(false)
  const device = useBreakpoints()
  const saveTag = tag => {
    save(true)
    fetch('/.netlify/functions/tag', {
      method: 'POST',
      body: JSON.stringify({
        title: tag.data.text,
        recordId: record.sys.id,
        tagData: {
          geometry: tag.geometry,
          data: {
            ...tag.data,
            id: uuid(),
            user: localStorage.getItem('user')
          }
        }
      })
    }).then(refetch)
  }
  const deleteTag = id => {
    deletion(id)
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
    deletion(false)
    save(false)
  }, [record])
  const anotateProps = {}
  if (saving) {
    anotateProps.renderEditor = ({ annotation }) => (
      <div
        className={styles.content}
        style={{
          left: `${annotation.geometry.x + annotation.geometry.width / 2}%`,
          top: `${annotation.geometry.y + annotation.geometry.height}%`
        }}
      >
        Saving tag...
      </div>
    )
  }
  return (
    <div className={cx([styles.attachment, isLoaded && styles.show])}>
      <Annotation
        {...anotateProps}
        src={attachment.url}
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
              height: `${annotation.geometry.height}%`,
              display: deleting === annotation.data.id ? 'none' : 'block'
            }}
          >
            {(annotation.data.user === localStorage.getItem('user') || localStorage.getItem('role') === 'admin') && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you wish to delete this tag?')) {
                    deleteTag(annotation.data.id)
                  }
                }}
              >
                <Delete />
              </button>
            )}
          </div>
        )}
        renderContent={({ key, annotation }) => (
          <div
            key={key}
            className={styles.content}
            style={{
              left: `${annotation.geometry.x + annotation.geometry.width / 2}%`,
              top: `${annotation.geometry.y + annotation.geometry.height}%`,
              display: deleting === annotation.data.id ? 'none' : 'block'
            }}
          >
            {annotation.data.text}
          </div>
        )}
      />
      <img
        src={attachment.url}
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
        href={attachment.url.split('?')[0]}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Image
      </a>
      {!device.isTouchDevice && <p className={styles.overlay}>Click and drag to tag</p>}
    </div>
  )
}

export default Image
