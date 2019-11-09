import React from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { hooks } from 'settings'
import Container from 'components/Container'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Banner from 'components/Banner'

const query = gql`
    query Town {
        contentPage(id: "63JlWL1XlnCVyvz9GvAJ9s") {
            title
            content {
                json
            }
        }
    }
`

const Town = () => {
    hooks.useMeta('FLHS :: The Town')
    const { data, error, loading } = useQuery(query)
    return (
        <>
            <Banner id="3RlsX7hbYApvYyxHmzmB9D" />
            <main>
                <Container light pad>
                    {error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            {loading ? (
                                <Loading />
                            ) : (
                                <>
                                    <div
                                        className="generic"
                                        dangerouslySetInnerHTML={{
                                            __html: documentToHtmlString(data.contentPage.content.json)
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </Container>
            </main>
        </>
    )
}

export default Town
