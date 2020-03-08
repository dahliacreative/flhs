import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import cx from 'classnames'
import ReactGA from 'react-ga'
import Pagination from 'components/Pagination'
import { useBreakpoints } from 'react-device-breakpoints'
import styles from './styles.module.sass'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PDF = ({ record }) => {
  const [state, setState] = useState({
    page: 1,
    total: null,
    loaded: false
  })
  const device = useBreakpoints()
  return (
    <div className={cx([styles.attachment, state.loaded && styles.show])}>
      <Document
        file={record.pdf.url}
        onLoadSuccess={({ numPages }) =>
          setState({
            ...state,
            total: numPages,
            loaded: true
          })
        }
      >
        <Page pageNumber={state.page} />
      </Document>
      {state.total > 1 && (
        <Pagination
          activePage={state.page}
          onChange={page =>
            setState({
              ...state,
              page
            })
          }
          itemsCountPerPage={1}
          totalItemsCount={state.total}
          device={device}
        />
      )}
      <a
        onClick={() => {
          ReactGA.event({
            category: 'Archive',
            action: 'Download',
            label: record.sys.id
          })
        }}
        className={styles.download}
        href={record.pdf.url}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Image
      </a>
    </div>
  )
}

export default PDF
