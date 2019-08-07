import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import cx from 'classnames'
import { DiscussionEmbed } from 'disqus-react'
import { constants, hooks } from 'settings'
import { RecordFragment } from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'

const query = gql`
    ${RecordFragment}
    query Record($id: String!, $transform: ImageTransformOptions!) {
        record(id: $id) {
            ...RecordFragment
            description
            year
            credit
        }
    }
`

const Record = ({ match, history }) => {
    const [title, updateTitle] = useState('FLHS :: The Archives')
    const [isLoaded, setLoaded] = useState(false)
    hooks.useMeta(title)
    const {
        loading,
        error,
        data: { record }
    } = useQuery(query, {
        variables: {
            id: match.params.id,
            transform: constants.RECORD_IMAGE_DIMENSIONS
        },
        onCompleted: data => {
            updateTitle(`FLHS :: Archive :: Record :: ${data.record.title}`)
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
                                <div className={styles.attachment}>
                                    <img
                                        src={record.attachment.url}
                                        alt={record.title}
                                        className={cx([styles.image, isLoaded && styles.show])}
                                        onLoad={() => setLoaded(true)}
                                    />
                                </div>
                                <h1 className={styles.title}>{record.title}</h1>
                                <p className={styles.date}>
                                    {record.year} Credit {record.credit}
                                </p>
                                <p className={styles.description}>{record.description}</p>
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
                            </>
                        )}
                    </>
                )}
            </Container>
        </main>
    )
}

export default Record
