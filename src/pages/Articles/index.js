import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Article, { ArticleFragment } from 'components/Article'
import Banner from 'components/Banner'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'

const query = gql`
    ${ArticleFragment}
    query Articles($transform: ImageTransformOptions, $avatar: ImageTransformOptions) {
        articleCollection {
            items {
                ...ArticleFragment
            }
        }
    }
`

const Articles = ({ client }) => {
    hooks.useMeta('FLHS :: Articles')
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        vairables: { transform: constants.CARD_IMAGE_DIMENSIONS, avatar: constants.AVATAR_IMAGE_DIMENSIONS }
    })
    console.log(data)
    return (
        <>
            <Banner id="1Hm5XZqqZanTULOcjiVOjI" />
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
                                    {data.articleCollection.items.map(article => (
                                        <Grid.Item key={article.sys.id}>
                                            <Article {...article} />
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

export default Articles
