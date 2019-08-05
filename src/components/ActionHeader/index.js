import React from 'react'
import styles from './styles.module.sass'

const Column = ({ children }) => <div className={styles.column}>{children}</div>
const Control = ({ children }) => <div className={styles.control}>{children}</div>
const Label = ({ children }) => <label className={styles.label}>{children}</label>
const Results = ({ collection }) => (
    <span className={styles.display}>
        Displaying{' '}
        <span className={styles.highlight}>
            {collection.skip + 1}-
            {collection.skip + collection.limit > collection.total
                ? collection.total
                : collection.skip + collection.limit}{' '}
        </span>
        of <span className={styles.highlight}>{collection.total}</span> records
    </span>
)
const ActionHeader = ({ children }) => <div className={styles.wrapper}>{children}</div>

ActionHeader.Column = Column
ActionHeader.Control = Control
ActionHeader.Label = Label
ActionHeader.Results = Results

export default ActionHeader
