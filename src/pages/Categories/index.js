import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants } from 'settings'
import Category, { CategoryFragment } from 'components/Category'
import Banner, { BannerFragment } from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${CategoryFragment}
    ${BannerFragment}
    query Categories($transform: ImageTransformOptions, $bannerId: String!, $bannerTransform: ImageTransformOptions) {
        categoryCollection {
            items {
                ...CategoryFragment
            }
        }
        pageBanner(id: $bannerId) {
            ...BannerFragment
        }
    }
`

const Categories = () => {
    const device = useBreakpoints()
    return (
        <Query
            query={query}
            variables={{
                transform: constants.CARD_IMAGE_DIMENSIONS,
                bannerId: '6Zm6u4oc2hZZ9J3Xa8wxoa',
                bannerTransform: constants.BANNER_IMAGE_DIMENSIONS
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />
                return (
                    <>
                        <Banner {...data.pageBanner} />
                        <main>
                            <Container light pad>
                                <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                                    {data.categoryCollection.items.map(category => (
                                        <Grid.Item key={category.sys.id}>
                                            <Category {...category} />
                                        </Grid.Item>
                                    ))}
                                </Grid>
                            </Container>
                        </main>
                    </>
                )
            }}
        </Query>
    )
}

export default Categories
