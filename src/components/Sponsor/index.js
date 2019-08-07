import React from 'react'
import Button from 'components/Button'
import cx from 'classnames'
import styles from './styles.module.sass'

const Sponsor = ({ name, biography, website, type, logo }) => (
    <div className={cx([styles.sponsor, styles[type]])}>
        {type === 'gold' || type === 'silver' ? (
            <>
                <div className={styles.logo}>
                    <img src={logo.url} alt={name} />
                </div>
                <div className={styles.about}>
                    <h3>{name}</h3>
                    <p>{biography}</p>
                    <Button href={website} target="_blank" rel="noopener noreferrer">
                        Visit {name}
                    </Button>
                </div>
            </>
        ) : (
            <>
                {type === 'bronze' ? (
                    <a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <img src={logo.url} alt={name} />
                    </a>
                ) : (
                    <p className={styles.name}>{name}</p>
                )}
            </>
        )}
    </div>
)

export default Sponsor
