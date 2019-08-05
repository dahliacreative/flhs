import React from 'react'
import styles from './styles.module.sass'

const Button = ({ children, ...props }) => (
    <button className={styles.button} {...props}>
        {children}
    </button>
)

export default Button
