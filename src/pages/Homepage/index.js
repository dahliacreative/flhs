import React from 'react'
import Container from 'components/Container'
import Banner from 'components/Banner'

import NewsPartial from './news'

const Homepage = () => {
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
