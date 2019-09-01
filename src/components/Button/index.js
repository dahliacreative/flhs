import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.sass'
import cx from 'classnames'

const Button = ({ children, secondary, ...props }) => {
    if (props.href) {
        return (
            <a className={cx([styles.button, secondary && styles.secondary])} {...props}>
                {children}
            </a>
        )
    }
    if (props.to) {
        return (
            <Link className={cx([styles.button, secondary && styles.secondary])} {...props}>
                {children}
            </Link>
        )
    }
    return (
        <button className={cx([styles.button, secondary && styles.secondary])} {...props}>
            {children}
        </button>
    )
}

export default Button
