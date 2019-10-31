import React from 'react'
import cx from 'classnames'
import { hooks } from 'settings'
import Container from 'components/Container'
import Banner from 'components/Banner'
import Button from 'components/Button'

import NewsPartial from './news'
import EventPartial from './event'

import styles from './styles.module.sass'

const Homepage = () => {
    hooks.useMeta('FLHS :: Home')
    return (
        <>
            <Banner id="2czKBE4gEnYEgEJasstKMP" resize="BOTTOM" />
            <main>
                <Container light flat>
                    <div className={styles.feature}>
                        <div className={cx([styles.featureDetail])}>
                            <h1>Welcome to the Finedon Local History Society</h1>
                            <p>
                                It has taken almost a year in development but here is the new Finedon Local History
                                Society’s (FLHS) website. We hope that you enjoy looking at the material which has been
                                added to the site so far, but please remember, the website is a work in progress and
                                will only get bigger and better as time goes on. Please remember too, it is also your
                                website and we’ll be happy to listen to any feedback, suggestions and ideas for new
                                sections, although some may already be works in progress.
                            </p>
                            <p>
                                It is important to understand that much of the material that we place on the website has
                                little by the way of donor credits or in many cases identification. Some picture
                                captions we have added may be incorrect but we will be more than happy for those viewing
                                the website who know better than we, to advise us what to change, to make the content
                                more accurate.
                            </p>
                            <div className={styles.actions}>
                                <Button to="/news/71VVJvH3MQZs1W0k6NWFPS" secondary>
                                    Read more
                                </Button>
                            </div>
                        </div>
                        <div className={styles.featureImage}>
                            <img
                                src="https://images.ctfassets.net/s8lmwsl3nd3d/6Q3sRFzqejxSjS6sRuRHw0/6324d94410c66574116b2a72fad9bd50/DSCN1192_2.jpeg?w=1280&h=990&q=30&fit=fill&f=center&fm=jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <EventPartial />
                    <NewsPartial />
                </Container>
            </main>
        </>
    )
}

export default Homepage
