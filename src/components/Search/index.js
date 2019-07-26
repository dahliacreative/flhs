import React, { useState } from 'react'
import styles from './styles.module.sass'

const Search = () => {
    const [term, updateTerm] = useState('')
    const performSearch = () => {
        console.log(term)
    }
    return (
        <form className={styles.search} onSubmit={performSearch}>
            <input
                className={styles.input}
                value={term}
                onChange={e => updateTerm(e.target.value)}
                placeholder="Search"
            />
            <button type="submit" className={styles.button}>
                Search
            </button>
        </form>
    )
}

export default Search
