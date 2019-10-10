import React from 'react'
import cx from 'classnames'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants } from 'settings'
import Article, { ArticleFragment } from 'components/Article'
import Event, { EventFragment } from 'components/Event'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Grid from 'components/Grid'
import Container from 'components/Container'
import Button from 'components/Button'
import styles from './styles.module.sass'

const query = gql`
    ${ArticleFragment}
    ${EventFragment}
    query Articles($transform: ImageTransformOptions!, $avatar: ImageTransformOptions!) {
        articleCollection(limit: 3) {
            items {
                ...ArticleFragment
            }
        }
        eventCollection(limit: 3) {
            items {
                ...EventFragment
            }
        }
    }
`

const NewsPartial = ({ client }) => {
    const device = useBreakpoints()
    const { loading, error, data } = useQuery(query, {
        variables: { transform: constants.CARD_IMAGE_DIMENSIONS, avatar: constants.AVATAR_IMAGE_DIMENSIONS }
    })
    const concat = data.articleCollection ? data.articleCollection.items.concat(data.eventCollection.items) : []
    const results = concat
        .sort((a, b) => new Date(b.sys.firstPublishedAt) - new Date(a.sys.firstPublishedAt))
        .slice(0, device.isTablet || device.isLargeMobile ? 2 : 3)
    return (
        <Container pad>
            <h3 className={cx([styles.title, styles.center])}>Latest News & Events</h3>
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                            {results.map(item => (
                                <Grid.Item key={item.sys.id}>
                                    {item.__typename === 'Article' ? <Article {...item} /> : <Event {...item} />}
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
                <Button to="/events" secondary>
                    View all events
                </Button>
            </div>
        </Container>
    )
}

export default NewsPartial
