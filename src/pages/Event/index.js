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
    query Event($id: String!, $transform: ImageTransformOptions!) {
        event(id: $id) {
            ...EventFragment
            content {
                json
            }
        }
    }
`

const Record = ({ match, history }) => {
    const [title, updateTitle] = useState('FLHS :: Event')
    hooks.useMeta(title)
    const {
        loading,
        error,
        data: { event }
    } = useQuery(query, {
        variables: {
            id: match.params.id,
            transform: constants.BANNER_IMAGE_DIMENSIONS
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
                            <Banner
                                banner={{
                                    bannerImage: {
                                        url: event.banner.url
                                    }
                                }}
                            />
                            <main>
                                <Container light pad>
                                    <h1 className={styles.title}>{event.title}</h1>
                                    <p className={styles.date}>
                                        {dayjs(event.date).format('ddd DD MMM YYYY')} at{' '}
                                        {dayjs(event.date).format('HH:mm')}
                                    </p>
                                    <div
                                        className="generic"
                                        dangerouslySetInnerHTML={{
                                            __html: documentToHtmlString(event.content.json)
                                        }}
                                    />
                                    <div className={styles.comments}>
                                        <DiscussionEmbed
                                            shortname={constants.DISQUS_SHORTNAME}
                                            config={{
                                                url: `${window.location.origin}/events/${event.sys.id}`,
                                                identifier: event.sys.id,
                                                title: event.title
                                            }}
                                        />
                                    </div>
                                </Container>
                            </main>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Record
