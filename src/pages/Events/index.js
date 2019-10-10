import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Event, { EventFragment } from 'components/Event'
import Banner from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${EventFragment}
    query Events($transform: ImageTransformOptions!) {
        eventCollection(order: date_ASC) {
            items {
                ...EventFragment
            }
        }
    }
`

const Events = ({ client }) => {
    hooks.useMeta('FLHS :: Events')
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.CARD_IMAGE_DIMENSIONS }
    })
    return (
        <>
            <Banner id="1vBuKgF9Of8qiZebVd2jiN" />
            <main>
                <Container light pad>
                    {error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            {loading ? (
                                <Loading />
                            ) : (
                                <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                                    {data.eventCollection.items.map(event => (
                                        <Grid.Item key={event.sys.id}>
                                            <Event {...event} />
                                        </Grid.Item>
                                    ))}
                                </Grid>
                            )}
                        </>
                    )}
                </Container>
            </main>
        </>
    )
}

export default Events
