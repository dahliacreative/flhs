import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.sass'

const Button = ({ children, ...props }) => {
    if (props.onClick) {
        return (
            <button className={styles.button} {...props}>
                {children}
            </button>
        )
    }
    if (props.href) {
        return (
            <a className={styles.button} {...props}>
                {children}
            </a>
        )
    }
    if (props.to) {
        return (
            <Link className={styles.button} {...props}>
                {children}
            </Link>
        )
    }
}

export default Button
