import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { constants } from 'settings'
import { RecordFragment } from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'

const query = gql`
  ${RecordFragment}
  query Records($transform: ImageTransformOptions!) {
    recordCollection(limit: 5, order: sys_firstPublishedAt_DESC) {
      items {
        ...RecordFragment
        credit
      }
    }
  }
`

const RecordPartial = ({ client }) => {
  const { loading, error, data } = useQuery(query, {
    variables: { transform: constants.CARD_IMAGE_DIMENSIONS }
  })
  return (
    <Container flat>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className={styles.recordGrid}>
              {data.recordCollection.items.map((record, i) => {
                const url =
                  i === 0 ? record.attachment.url.replace('w=760&h=440', 'w=852&h=986') : record.attachment.url
                return (
                  <Link to="/archives/categories" className={styles.record} key={record.sys.id}>
                    <img src={url} alt={record.title} />
                    <div className={styles.info}>
                      <p>{record.title}</p>
                      {record.credit && !record.credit.includes('unknown') && <p>{record.credit}</p>}
                      <Button secondary>View the archive</Button>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default RecordPartial
