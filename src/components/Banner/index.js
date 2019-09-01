import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { constants } from 'settings'
import Container from 'components/Container'
import styles from './styles.module.sass'

const query = gql`
    query Banner($id: String!, $transform: ImageTransformOptions!) {
        pageBanner(id: $id) {
            page
            caption
            credit
            bannerImage {
                url(transform: $transform)
            }
        }
    }
`

const Banner = ({ id }) => {
    const [hasLoaded, setLoaded] = useState(false)
    const {
        data: { pageBanner }
    } = useQuery(query, {
        variables: { id, transform: constants.BANNER_IMAGE_DIMENSIONS }
    })
    useEffect(() => {
        setLoaded(false)
    }, [id])
    return (
        <div className={styles.banner}>
            {pageBanner && (
                <>
                    <img
                        src={pageBanner.bannerImage.url}
                        alt={pageBanner.caption}
                        className={cx([styles.image, hasLoaded && styles.show])}
                        onLoad={() => setLoaded(true)}
                    />

                    <div className={styles.title}>
                        <Container>
                            <h1>{pageBanner.page}</h1>
                        </Container>
                    </div>
                    {(pageBanner.caption || pageBanner.credit) && (
                        <div className={styles.content}>
                            <Container>
                                {pageBanner.caption && <p className={styles.caption}>{pageBanner.caption}</p>}
                                {pageBanner.credit && <p className={styles.credit}>{pageBanner.credit}</p>}
                            </Container>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Banner
