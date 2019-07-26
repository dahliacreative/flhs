import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'components/Container'
import Search from 'components/Search'
import styles from './styles.module.sass'
import { navigation } from 'settings'

const SecondaryNav = () => (
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.inner}>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        {navigation.secondary.map(item => (
                            <li className={styles.item} key={item.url}>
                                <NavLink to={item.url} className={styles.link} activeClassName={styles.active}>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Search />
            </div>
        </Container>
    </div>
)

export default SecondaryNav
