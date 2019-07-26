import React, { createContext, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './styles.module.sass'

const Context = createContext()

const Card = ({ children, ...props }) => (
    <Context.Provider value={props}>
        <article>{children}</article>
    </Context.Provider>
)

const Title = () => {
    const data = useContext(Context)
    return <h3 className={styles.title}>{data.title}</h3>
}

const Image = () => {
    const data = useContext(Context)
    return (
        <div className={styles.image}>
            <img src={data.image.url} alt={data.title} />
        </div>
    )
}

const Link = ({ children, to }) => (
    <RouterLink to={to} className={styles.link}>
        {children}
    </RouterLink>
)

Card.Title = Title
Card.Image = Image
Card.Link = Link

export default Card
