import React from 'react'
import { NavLink } from 'react-router-dom'
import { useBreakpoints } from 'react-device-breakpoints'
import cx from 'classnames'
import SecondaryNavigtion from 'components/SecondaryNavigation'
import styles from './styles.module.sass'
import { navigation } from 'settings'

const Navigation = ({ isOpen }) => {
    const device = useBreakpoints()
    return (
        <div className={cx([styles.wrapper, isOpen && styles.isOpen])}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {navigation.primary.map(item => (
                        <li className={styles.item} key={item.url}>
                            <NavLink to={item.url} className={styles.link} activeClassName={styles.active}>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {(device.isTablet || device.isLargeMobile || device.isMobile) && <SecondaryNavigtion />}
        </div>
    )
}

export default Navigation
