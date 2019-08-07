import React from 'react'
import styles from './styles.module.sass'
import cx from 'classnames'

const Container = ({ children, light, brand, pad, flat, className, ...props }) => (
    <div
        className={cx([
            styles.container,
            light && styles.light,
            brand && styles.brand,
            pad && styles.pad,
            flat && styles.flat,
            className && className
        ])}
        {...props}
    >
        {children}
    </div>
)

export default Container
