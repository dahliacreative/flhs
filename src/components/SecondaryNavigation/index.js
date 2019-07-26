import React from 'react'
import Container from 'components/Container'
import Search from 'components/Search'
import { GenerateNavigation } from 'components/Navigation'
import styles from './styles.module.sass'
import { navigation } from 'settings'

const SecondaryNav = () => (
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.inner}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>{GenerateNavigation(navigation.secondary, styles)}</ul>
                </nav>
                <Search />
            </div>
        </Container>
    </div>
)

export default SecondaryNav
