import React, { useState, useEffect } from 'react'
import styles from './styles.module.sass'

let timer

const Loading = () => {
    const [display, toggleDisplay] = useState(false)
    useEffect(() => {
        timer = setTimeout(() => {
            toggleDisplay(true)
        }, 500)
        return () => clearTimeout(timer)
    }, [toggleDisplay])
    return display ? (
        <div className={styles.loader}>
            <span />
            <span />
            <span />
            <span />
        </div>
    ) : null
}

export default Loading
