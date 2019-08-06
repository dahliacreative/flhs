import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Category, { CategoryFragment } from 'components/Category'
import Banner, { BannerFragment } from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const banner = gql`
    ${BannerFragment}
    query Banner($bannerId: String!, $bannerTransform: ImageTransformOptions!) {
        pageBanner(id: $bannerId) {
            ...BannerFragment
        }
    }
`

const categories = gql`
    ${CategoryFragment}
    query Categories($transform: ImageTransformOptions) {
        categoryCollection {
            items {
                ...CategoryFragment
            }
        }
    }
`

const Categories = () => {
    hooks.useMeta('FLHS :: Archive Categories')
    const device = useBreakpoints()

    return (
        <>
            <Query
                query={banner}
                variables={{
                    bannerId: '6Zm6u4oc2hZZ9J3Xa8wxoa',
                    bannerTransform: constants.BANNER_IMAGE_DIMENSIONS
                }}
            >
                {({ loading, error, data }) => {
                    return <Banner {...data.pageBanner} loading={loading} error={error} />
                }}
            </Query>
            <main>
                <Container light pad>
                    <Query
                        query={categories}
                        variables={{
                            transform: constants.CARD_IMAGE_DIMENSIONS
                        }}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <Loading />
                            if (error) return <Error error={error} />
                            return (
                                <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                                    {data.categoryCollection.items.map(category => (
                                        <Grid.Item key={category.sys.id}>
                                            <Category {...category} />
                                        </Grid.Item>
                                    ))}
                                </Grid>
                            )
                        }}
                    </Query>
                </Container>
            </main>
        </>
    )
}

export default Categories
