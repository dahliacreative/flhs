import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/Container'
import styles from './styles.module.sass'

const Footer = () => (
    <footer role="contentinfo" className={styles.footer}>
        <Container>
            <div className={styles.sponsors}>Sponsors!</div>
        </Container>
        <div className={styles.links}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link className={styles.link} to="/privacy-policy">
                            Privacy Policy
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link className={styles.link} to="/terms-and-conditions">
                            Terms & Conditions
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <Link className={styles.link} to="/sitemap">
                            SiteMap
                        </Link>
                    </li>
                    <li className={styles.item}>© FLHS 2019. Registered charity No. 01234567890</li>
                    <li className={styles.item}>
                        Website by{' '}
                        <a href="http://www.dahliacreative.com" className={styles.external}>
                            dahliacreative
                        </a>
                    </li>
                </ul>
            </Container>
        </div>
    </footer>
)

export default Footer
