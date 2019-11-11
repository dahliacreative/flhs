import React, { createContext, useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './styles.module.sass'
import cx from 'classnames'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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

const Date = ({ live, format = 'DD/MM/YYYY' }) => {
    const data = useContext(Context)
    return (
        <p className={styles.date}>
            {!live && 'Added'}{' '}
            {dayjs(data.sys.firstPublishedAt)
                .utc()
                .format(format)}
        </p>
    )
}

const CommentCount = ({ children }) => <div className={styles.count}>{children}</div>

const Image = ({ className }) => {
    const data = useContext(Context)
    const imageHasLoaded = () => {
        setTimeout(() => {
            data.setVisible(true)
        }, 100)
    }
    return (
        <div className={cx(styles.image, className && styles[className])}>
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

const Link = ({ children, to, href, ...props }) => (
    <>
        {href ? (
            <a href={href} className={styles.link} {...props}>
                {children}
            </a>
        ) : (
            <RouterLink to={to} className={styles.link} {...props}>
                {children}
            </RouterLink>
        )}
    </>
)

Card.Title = Title
Card.Image = Image
Card.Link = Link
Card.Header = Header
Card.Date = Date
Card.Tag = Tag
Card.CommentCount = CommentCount

export default Card
