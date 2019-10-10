import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Category, { CategoryFragment } from 'components/Category'
import Banner from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${CategoryFragment}
    query Categories($transform: ImageTransformOptions!) {
        categoryCollection {
            items {
                ...CategoryFragment
            }
        }
    }
`

const Categories = ({ client }) => {
    hooks.useMeta('FLHS :: Archive :: Categories')
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.CARD_IMAGE_DIMENSIONS }
    })
    return (
        <>
            <Banner id="6Zm6u4oc2hZZ9J3Xa8wxoa" />
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
                                    {data.categoryCollection.items.map(category => (
                                        <Grid.Item key={category.sys.id}>
                                            <Category {...category} />
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

export default Categories
