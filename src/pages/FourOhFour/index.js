import React from 'react'
import { hooks } from 'settings'
import Container from 'components/Container'
import Banner from 'components/Banner'
import { Link } from 'react-router-dom'

const FourOhFour = () => {
    hooks.useMeta('FLHS :: Page Not Found')
    return (
        <>
            <Banner id="2MgKQHO2YvprNlOKcJi9U4" />
            <main>
                <Container light pad>
                    <div className="generic">
                        <h3>Sorry but we can not find the page you are looking for.</h3>
                        <p>
                            Please head back to the <Link to="/">homepage</Link>, or use the navigation.
                        </p>
                    </div>
                </Container>
            </main>
        </>
    )
}

export default FourOhFour
