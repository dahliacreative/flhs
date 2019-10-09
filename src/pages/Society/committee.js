import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import { gql } from 'apollo-boost'
import Member, { MemberFragment } from 'components/Member'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${MemberFragment}
    query CommitteeMembers($transform: ImageTransformOptions) {
        committeeMemberCollection(order: sys_publishedAt_ASC) {
            items {
                ...MemberFragment
            }
        }
    }
`

const Committee = () => {
    hooks.useMeta('FLHS :: Scoiety :: Committee')
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        vairables: { transform: constants.CARD_IMAGE_DIMENSIONS }
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
                            {data.committeeMemberCollection.items.map(member => (
                                <Grid.Item key={member.sys.id}>
                                    <Member {...member} />
                                </Grid.Item>
                            ))}
                        </Grid>
                    )}
                </>
            )}
        </Container>
    )
}

export default Committee
