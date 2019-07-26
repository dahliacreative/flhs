import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'components/Container'
import Search from 'components/Search'
import styles from './styles.module.sass'

const SecondaryNav = () => (
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.inner}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <NavLink to="/news" className={styles.link} activeClassName={styles.active}>
                                News
                            </NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink to="/events" className={styles.link} activeClassName={styles.active}>
                                Events
                            </NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink to="/contact" className={styles.link} activeClassName={styles.active}>
                                Get In Touch
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <Search />
            </div>
        </Container>
    </div>
)

export default SecondaryNav
