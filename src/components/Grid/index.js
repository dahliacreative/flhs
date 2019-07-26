import React from 'react'
import styles from './styles.module.sass'
import cx from 'classnames'

const Grid = ({ children, columns = 3 }) => (
    <div className={cx([styles.grid, styles[`col-${columns}`]])}>{children}</div>
)

const Item = ({ children }) => <div className={styles.item}>{children}</div>

Grid.Item = Item

export default Grid
