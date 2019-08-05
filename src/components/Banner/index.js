import React, { useState } from 'react'
import cx from 'classnames'
import { gql } from 'apollo-boost'
import Container from 'components/Container'
import styles from './styles.module.sass'

const BannerFragment = gql`
    fragment BannerFragment on PageBanner {
        page
        caption
        credit
        bannerImage {
            url(transform: $bannerTransform)
        }
    }
`

const Banner = ({ page, caption, credit, bannerImage }) => {
    const [hasLoaded, setLoaded] = useState(false)
    return (
        <div className={cx([styles.banner, hasLoaded && styles.show])}>
            <img src={bannerImage.url} alt={caption} className={styles.image} onLoad={() => setLoaded(true)} />
            <div className={styles.title}>
                <Container>
                    <h1>{page}</h1>
                </Container>
            </div>
            {(caption || credit) && (
                <div className={styles.content}>
                    <Container>
                        {caption && <p className={styles.caption}>{caption}</p>}
                        {credit && <p className={styles.credit}>{credit}</p>}
                    </Container>
                </div>
            )}
        </div>
    )
}

export default Banner
export { BannerFragment }
