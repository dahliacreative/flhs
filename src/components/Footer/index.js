import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/Container'
import { GenerateNavigation } from 'components/Navigation'
import styles from './styles.module.sass'
import { navigation } from 'settings'

const Footer = () => (
    <footer role="contentinfo" className={styles.footer}>
        <Container>
            <div className={styles.sponsors}>Sponsors!</div>
        </Container>
        <div className={styles.links}>
            <Container>
                <ul className={styles.list}>
                    {GenerateNavigation(navigation.footer, styles, Link)}
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
