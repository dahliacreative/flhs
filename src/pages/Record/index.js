import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { DiscussionEmbed } from 'disqus-react'
import { constants } from 'settings'
import { RecordFragment } from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
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

const Record = ({ match }) => (
    <Query
        query={query}
        variables={{
            id: match.params.id,
            transform: constants.RECORD_IMAGE_DIMENSIONS
        }}
    >
        {({ loading, error, data: { record } }) => {
            if (loading) return <Loading />
            if (error) return <Error error={error} />
            return (
                <main className="no-banner">
                    <Container light pad>
                        <div className={styles.attachment}>
                            <img src={record.attachment.url} alt={record.title} className={styles.image} />
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
                    </Container>
                </main>
            )
        }}
    </Query>
)

export default Record
