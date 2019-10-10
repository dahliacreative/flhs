import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import { gql } from 'apollo-boost'
import Newsletter, { NewsletterFragment } from 'components/Newsletter'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${NewsletterFragment}
    query Newsletters {
        newsletterCollection {
            items {
                ...NewsletterFragment
            }
        }
    }
`

const Newsletters = () => {
    hooks.useMeta('FLHS :: Society :: Newsletters')
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.CARD_IMAGE_DIMENSIONS }
    })
    return (
        <Container light pad>
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                            {data.newsletterCollection.items.map(newsletter => (
                                <Grid.Item key={newsletter.sys.id}>
                                    <Newsletter {...newsletter} />
                                </Grid.Item>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Container>
    )
}

export default Newsletters
