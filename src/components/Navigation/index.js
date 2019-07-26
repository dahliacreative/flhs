import React from 'react'
import { NavLink } from 'react-router-dom'
import { useBreakpoints } from 'react-device-breakpoints'
import cx from 'classnames'
import SecondaryNavigtion from 'components/SecondaryNavigation'
import styles from './styles.module.sass'

const Navigation = ({ isOpen }) => {
    const device = useBreakpoints()
    return (
        <div className={cx([styles.wrapper, isOpen && styles.isOpen])}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to="/town" className={styles.link} activeClassName={styles.active}>
                            The Town
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to="/society" className={styles.link} activeClassName={styles.active}>
                            The Society
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to="/archives/categories" className={styles.link} activeClassName={styles.active}>
                            The Archives
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to="/sponsors" className={styles.link} activeClassName={styles.active}>
                            Our Sponsors
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {(device.isTablet || device.isLargeMobile || device.isMobile) && <SecondaryNavigtion />}
        </div>
    )
}

export default Navigation
