import React, { createContext, useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './styles.module.sass'
import cx from 'classnames'
import dayjs from 'dayjs'

const Context = createContext()

const Card = ({ children, visible = false, ...props }) => {
    const [isVisible, setVisible] = useState(visible)
    return (
        <Context.Provider value={{ ...props, isVisible, setVisible }}>
            <article className={cx([styles.card, isVisible && styles.show])}>{children}</article>
        </Context.Provider>
    )
}

const Title = () => {
    const data = useContext(Context)
    return <h3 className={styles.title}>{data.title}</h3>
}

const Header = ({ children }) => <div className={styles.header}>{children}</div>

const Tag = ({ title, ...props }) => (
    <span className={styles.tag} {...props}>
        {title}
    </span>
)

const Date = () => {
    const data = useContext(Context)
    return <p className={styles.date}>Added {dayjs(data.sys.firstPublishedAt).format('DD/MM/YYYY')}</p>
}

const CommentCount = ({ children }) => <div className={styles.count}>{children}</div>

const Image = () => {
    const data = useContext(Context)
    const imageHasLoaded = () => {
        setTimeout(() => {
            data.setVisible(true)
        }, 100)
    }
    if (!data.image) {
        data.setVisible(true)
        return null
    }
    return (
        <div className={styles.image}>
            <img
                className={styles.original}
                src={data.image ? data.image.url : data.attachment.url}
                alt={data.title}
                onLoad={imageHasLoaded}
            />
            <div className={cx([styles.placeholder, data.isVisible && styles.hidden])}>
                <img src={require('images/placeholder.png')} alt="" />
            </div>
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
Card.Header = Header
Card.Date = Date
Card.Tag = Tag
Card.CommentCount = CommentCount

export default Card
