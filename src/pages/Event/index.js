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
                                    <div className="generic">
                                        <h1 className={styles.title}>{event.title}</h1>
                                        <h3 style={{ marginTop: 0 }}>{event.speaker}</h3>
                                    </div>
                                    <div
                                        className="generic"
                                        dangerouslySetInnerHTML={{
                                            __html: documentToHtmlString(event.content.json)
                                        }}
                                    />
                                    <div className="generic">
                                        {event.date && (
                                            <>
                                                <h3>Date / Time</h3>
                                                <p>
                                                    {dayjs(event.date)
                                                        .utc()
                                                        .format('ddd DD MMM YYYY, hh:mma')}
                                                </p>
                                            </>
                                        )}
                                        {(event.membersPrice || event.nonMembersPrice) && (
                                            <>
                                                <h3>Entry Fees</h3>
                                                <p>
                                                    {event.membersPrice && (
                                                        <>
                                                            <b>FLHS Members:</b> £
                                                            {parseFloat(event.membersPrice).toFixed(2)}
                                                        </>
                                                    )}
                                                    {event.nonMembersPrice && (
                                                        <>
                                                            <br />
                                                            <b>Non-members:</b> £
                                                            {parseFloat(event.nonMembersPrice).toFixed(2)}
                                                        </>
                                                    )}
                                                </p>
                                            </>
                                        )}
                                        {event.location && (
                                            <>
                                                <h3>Location</h3>
                                                <iframe
                                                    style={{ minHeight: 300 }}
                                                    title="map"
                                                    width="100%"
                                                    height="100%"
                                                    id="mapcanvas"
                                                    src={`https://maps.google.com/maps?q=${event.location}&Roadmap&z=10&ie=UTF8&iwloc=&output=embed`}
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    marginHeight="0"
                                                    marginWidth="0"
                                                ></iframe>
                                            </>
                                        )}
                                        <br />
                                        <br />
                                        <small>
                                            Please note that speakers and the subject topics may change at short notice
                                            due to circumstances beyond our control.
                                        </small>
                                    </div>
                                    <div className="generic">
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

export default Event
