import React from 'react'
import { NavLink } from 'react-router-dom'
import { useBreakpoints } from 'react-device-breakpoints'
import cx from 'classnames'
import SecondaryNavigtion from 'components/SecondaryNavigation'
import styles from './styles.module.sass'
import { navigation } from 'settings'

const GenerateNavigation = (list, styles, Component = NavLink) => {
    const props = {}
    if (Component === NavLink) {
        props.activeClassName = styles.active
    }
    return list.map(item => (
        <li className={styles.item} key={item.url}>
            <Component to={item.url} className={styles.link} {...props} {...item.props}>
                {item.label}
            </Component>
        </li>
    ))
}

const Navigation = ({ isOpen }) => {
    const device = useBreakpoints()
    return (
        <div className={cx([styles.wrapper, isOpen && styles.isOpen])}>
            <nav className={styles.nav}>
                <ul className={styles.list}>{GenerateNavigation(navigation.primary, styles)}</ul>
            </nav>
            {(device.isTablet || device.isLargeMobile || device.isMobile) && <SecondaryNavigtion />}
        </div>
    )
}

export default Navigation
export { GenerateNavigation }
