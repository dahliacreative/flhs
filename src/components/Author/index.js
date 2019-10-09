import React from 'react'
import styles from './styles.module.sass'

const Author = ({ name, avatar }) => (
    <div className={styles.author}>
        <img src={avatar.url} alt={name} />
        <div>
            <p>Written by</p>
            <p className={styles.name}>{name}</p>
        </div>
    </div>
)

export default Author
