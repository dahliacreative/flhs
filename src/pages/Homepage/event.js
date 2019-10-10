import React from 'react'
import cx from 'classnames'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { constants } from 'settings'
import { EventFragment } from 'components/Event'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Button from 'components/Button'
import styles from './styles.module.sass'

const query = gql`
    ${EventFragment}
    query Events($transform: ImageTransformOptions!) {
        eventCollection(limit: 1, order: date_ASC) {
            items {
                ...EventFragment
                content {
                    json
                }
            }
        }
    }
`

const EventPartial = ({ client }) => {
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.FEATURE_IMAGE_DIMENSIONS, avatar: constants.AVATAR_IMAGE_DIMENSIONS }
    })
    const event = data.eventCollection ? data.eventCollection.items[0] : {}
    return (
        <div className={styles.feature}>
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className={styles.featureImage}>
                                <img src={event.banner.url} alt={event.title} />
                            </div>
                            <div className={cx([styles.featureDetail, styles.dark])}>
                                <h3>Our Next Event</h3>
                                <h4>{event.title}</h4>
                                {event.speaker && <h5>{event.speaker}</h5>}
                                <div
                                    className="generic"
                                    dangerouslySetInnerHTML={{
                                        __html: documentToHtmlString(event.content.json)
                                    }}
                                />
                                {event.location && (
                                    <>
                                        <h5>Location</h5>
                                        <p>{event.location}</p>
                                    </>
                                )}
                                {(event.membersPrice || event.nonMembersPrice) && (
                                    <>
                                        <h5>Entry Fees</h5>
                                        <p>
                                            {event.membersPrice && (
                                                <>
                                                    <b>FLHS Members:</b> £{parseFloat(event.membersPrice).toFixed(2)}
                                                </>
                                            )}
                                            {event.nonMembersPrice && (
                                                <>
                                                    <br />
                                                    <b>Non-members:</b> £{parseFloat(event.nonMembersPrice).toFixed(2)}
                                                </>
                                            )}
                                        </p>
                                    </>
                                )}
                                <div className={styles.actions}>
                                    <Button to="/events" secondary>
                                        View all events
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default EventPartial
