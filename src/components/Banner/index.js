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

const PageBanner = ({ id }) => {
    const [hasLoaded, setLoaded] = useState(false)
    const [scroll, updateScroll] = useState(0)
    const {
        data: { pageBanner }
    } = useQuery(query, {
        variables: { id, transform: constants.BANNER_IMAGE_DIMENSIONS }
    })
    const setScroll = () => {
        updateScroll(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener('scroll', setScroll, { passive: true })
        return () => window.removeEventListener('scroll', setScroll, { passive: true })
    }, [])
    useEffect(() => {
        setLoaded(false)
        setScroll()
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
                        style={{ transform: `translate3d(-50%, ${scroll / 2}px, 0)` }}
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

const RecordBanner = ({ banner }) => {
    const [hasLoaded, setLoaded] = useState(false)
    return (
        <div className={styles.banner}>
            <img
                src={banner.bannerImage.url}
                alt={banner.caption}
                className={cx([styles.image, hasLoaded && styles.show])}
                onLoad={() => setLoaded(true)}
            />
            {banner.page && (
                <div className={styles.title}>
                    <Container>
                        <h1>{banner.page}</h1>
                    </Container>
                </div>
            )}
            {(banner.caption || banner.credit) && (
                <div className={styles.content}>
                    <Container>
                        {banner.caption && <p className={styles.caption}>{banner.caption}</p>}
                        {banner.credit && <p className={styles.credit}>{banner.credit}</p>}
                    </Container>
                </div>
            )}
        </div>
    )
}

const Banner = ({ id, banner }) => (id ? <PageBanner id={id} /> : banner ? <RecordBanner banner={banner} /> : null)

export default Banner
