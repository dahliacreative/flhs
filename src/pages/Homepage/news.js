import React from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants } from 'settings'
import Article, { ArticleFragment } from 'components/Article'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Grid from 'components/Grid'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'

const query = gql`
    ${ArticleFragment}
    query Articles($transform: ImageTransformOptions!, $avatar: ImageTransformOptions!) {
        articleCollection(limit: 3) {
            items {
                ...ArticleFragment
            }
        }
    }
`

const NewsPartial = ({ client }) => {
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.CARD_IMAGE_DIMENSIONS, avatar: constants.AVATAR_IMAGE_DIMENSIONS }
    })
    return (
        <Container pad>
            <h3 className={cx([styles.title, styles.center])}>Latest News</h3>
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
            <div className={styles.actions}>
                <Button to="/news" secondary>
                    View all news
                </Button>
            </div>
        </Container>
    )
}

export default NewsPartial
