import React from 'react'
import styles from './styles.module.sass'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const Publication = ({ title, banner, description, price, author, orderContactName, orderContactEmail }) => (
  <div className={styles.publication}>
    <div className={styles.cover}>
      <img src={banner.url} alt={title} />
    </div>
    <div className={styles.about}>
      <h3>{title}</h3>
      <p className={styles.author}>{author}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(description.json)
        }}
      />
      <p className={styles.price}>Available for {price}</p>
      <p className={styles.order}>
        To order a copy, please contact <a href={`mailto:${orderContactEmail}`}>{orderContactName}</a>
      </p>
    </div>
  </div>
)

export default Publication
