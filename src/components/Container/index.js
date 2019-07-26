import React from 'react'
import styles from './styles.module.sass'
import cx from 'classnames'

const Container = ({ children, ...props }) => (
    <div className={cx([styles.container, props.light && styles.light, props.pad && styles.pad])}>{children}</div>
)

export default Container
