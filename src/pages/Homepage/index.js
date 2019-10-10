import React from 'react'
import { hooks } from 'settings'
import Container from 'components/Container'
import Banner from 'components/Banner'

import NewsPartial from './news'

const Homepage = () => {
    hooks.useMeta('FLHS :: Home')
    return (
        <>
            <Banner id="2czKBE4gEnYEgEJasstKMP" />
            <main>
                <Container light flat>
                    <NewsPartial />
                </Container>
            </main>
        </>
    )
}

export default Homepage
