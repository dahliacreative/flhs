import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { constants, hooks } from 'settings'
import Banner from 'components/Banner'
import Container from 'components/Container'
import Tabs from 'components/Tabs'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Sponsor from 'components/Sponsor'
import styles from './styles.module.sass'

const date = new Date()
const tabs = ['gold', 'silver', 'bronze', 'individual']

const query = gql`
    query Sponsors($transform: ImageTransformOptions!, $date: DateTime!) {
        sponsorCollection(where: { expires_gte: $date }) {
            items {
                sys {
                    id
                }
                name
                biography
                website
                type
                logo {
                    url(transform: $transform)
                }
            }
        }
    }
`

const Sponsors = ({ history, match }) => {
    hooks.useMeta('FLHS :: Sponsors')
    const { loading, error, data } = useQuery(query, {
        variables: {
            transform: constants.SPONSOR_LARGE_IMAGE_DIMENSIONS,
            date
        }
    })
    const changeTab = i => {
        history.push(`/sponsors/${tabs[i]}`)
    }
    return (
        <>
            <Banner id="53vFKuS5TyVixKU1s7obxz" />
            <main className="">
                <Tabs active={tabs.findIndex(p => p === match.params.page)} onChange={changeTab}>
                    {/* <Container pad>
                        <Tabs.Navigation>
                            <Tabs.Link>Launch Sponsors</Tabs.Link>
                            <Tabs.Link>Silver Sponsors</Tabs.Link>
                            <Tabs.Link>Bronze Sponsors</Tabs.Link>
                            <Tabs.Link>Individual Sponsors</Tabs.Link>
                        </Tabs.Navigation>
                    </Container> */}

                    {error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            {loading ? (
                                <Loading />
                            ) : (
                                <Tabs.Panels>
                                    <Container light flat>
                                        {data.sponsorCollection.items
                                            .filter(s => s.type === 'gold')
                                            .map(s => (
                                                <Sponsor key={s.sys.id} {...s} />
                                            ))}
                                    </Container>
                                    <Container light flat>
                                        {data.sponsorCollection.items
                                            .filter(s => s.type === 'silver')
                                            .map(s => (
                                                <Sponsor key={s.sys.id} {...s} />
                                            ))}
                                    </Container>
                                    <Container brand pad className={styles.sponsors}>
                                        {data.sponsorCollection.items
                                            .filter(s => s.type === 'bronze')
                                            .map(s => (
                                                <Sponsor key={s.sys.id} {...s} />
                                            ))}
                                    </Container>
                                    <Container brand pad className={styles.sponsors}>
                                        {data.sponsorCollection.items
                                            .filter(s => s.type === 'personal')
                                            .map(s => (
                                                <Sponsor key={s.sys.id} {...s} />
                                            ))}
                                    </Container>
                                </Tabs.Panels>
                            )}
                        </>
                    )}
                </Tabs>
            </main>
        </>
    )
}

export default Sponsors
