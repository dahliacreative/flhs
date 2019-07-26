import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useBreakpoints } from 'react-device-breakpoints'
import cx from 'classnames'
import Container from 'components/Container'
import Brand from 'components/Brand'
import Navigation from 'components/Navigation'
import SecondaryNavigation from 'components/SecondaryNavigation'
import styles from './styles.module.sass'

const Header = ({ history }) => {
    const [navIsOpen, toggleNav] = useState(false)
    const device = useBreakpoints()
    useEffect(() => {
        const listener = history.listen(() => {
            toggleNav(false)
        })
        return listener
    }, [])
    return (
        <header role="banner" className={styles.header}>
            <Container>
                <div className={styles.main}>
                    <Brand />
                    {(device.isTablet || device.isLargeMobile || device.isMobile) && (
                        <button
                            onClick={() => toggleNav(!navIsOpen)}
                            className={cx([styles.hamburger, navIsOpen && styles.isOpen])}
                        >
                            <span>Toggle</span>
                        </button>
                    )}
                    <Navigation isOpen={navIsOpen} />
                </div>
            </Container>
            {(device.isDesktop || device.isLargeDesktop) && <SecondaryNavigation />}
        </header>
    )
}

export default withRouter(Header)
