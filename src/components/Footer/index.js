import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'
import Container from 'components/Container'
import { GenerateNavigation } from 'components/Navigation'
import styles from './styles.module.sass'
import { navigation, constants } from 'settings'

const date = new Date()

const query = gql`
    query Sponsors($transform: ImageTransformOptions!, $date: DateTime!) {
        sponsorCollection(where: { type: "gold", expires_gte: $date }) {
            items {
                sys {
                    id
                }
                logo {
                    url(transform: $transform)
                }
                website
            }
        }
    }
`

const Footer = () => {
    const { loading, error, data } = useQuery(query, {
        variables: {
            transform: constants.SPONSOR_IMAGE_DIMENSIONS,
            date
        }
    })
    return (
        <footer role="contentinfo" className={styles.footer}>
            <Container>
                {!loading && !error && (
                    <div className={styles.sponsors}>
                        <p>Thank you to our gold sponsors</p>
                        <div className={styles.logos}>
                            {data.sponsorCollection.items.map(i => (
                                <a
                                    href={i.website}
                                    key={i.sys.id}
                                    className={styles.sponsor}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={i.logo.url} alt="" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
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
}

export default Footer
