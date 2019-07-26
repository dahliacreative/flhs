import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.sass'

const Brand = () => (
    <Link to="/" className={styles.brand}>
        <img src={require('images/logo.svg')} alt="" />
        <div>
            <span>Finedon </span>
            <span>Local</span>
            <span>History Society</span>
        </div>
    </Link>
)

export default Brand
