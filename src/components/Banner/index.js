import React from 'react'
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

const Banner = ({ page, caption, credit, bannerImage }) => (
    <div className={styles.banner}>
        <img src={bannerImage.url} alt={caption} className={styles.image} />
        <div className={styles.title}>
            <Container>
                <h1>{page}</h1>
            </Container>
        </div>
        <div className={styles.content}>
            <Container>
                <p className={styles.caption}>{caption}</p>
                <p className={styles.credit}>{credit}</p>
            </Container>
        </div>
    </div>
)

export default Banner
export { BannerFragment }
