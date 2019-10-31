import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { gql } from 'apollo-boost'
import dayjs from 'dayjs'
import { DiscussionEmbed } from 'disqus-react'
import { constants, hooks } from 'settings'
import { ArticleFragment } from 'components/Article'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Banner from 'components/Banner'
import Author from 'components/Author'
import styles from './styles.module.sass'

const query = gql`
    ${ArticleFragment}
    query Article($id: String!, $transform: ImageTransformOptions!, $avatar: ImageTransformOptions!) {
        article(id: $id) {
            ...ArticleFragment
            content {
                json
            }
        }
    }
`

const Article = ({ match, history }) => {
    const [title, updateTitle] = useState('FLHS :: News')
    hooks.useMeta(title)
    const {
        loading,
        error,
        data: { article }
    } = useQuery(query, {
        variables: {
            id: match.params.id,
            transform: constants.BANNER_IMAGE_DIMENSIONS,
            avatar: constants.AVATAR_IMAGE_DIMENSIONS
        },
        onCompleted: data => {
            updateTitle(`FLHS :: News :: ${data.article.title}`)
        }
    })
    hooks.useMeta(title)
    return (
        <>
            {error ? (
                <Error error={error} />
            ) : (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Banner
                                banner={{
                                    bannerImage: {
                                        url: article.banner.url
                                    }
                                }}
                            />
                            <main>
                                <Container light pad>
                                    <div className="generic">
                                        <h1 className={styles.title}>{article.title}</h1>
                                        <p className={styles.date}>
                                            Published {dayjs(article.sys.firstPublishedAt).format('ddd DD MMM YYYY')}
                                        </p>
                                        <Author {...article.author} />
                                    </div>
                                    <div
                                        className="generic"
                                        dangerouslySetInnerHTML={{
                                            __html: documentToHtmlString(article.content.json)
                                        }}
                                    />
                                    <div className="generic">
                                        <div className={styles.comments}>
                                            <DiscussionEmbed
                                                shortname={constants.DISQUS_SHORTNAME}
                                                config={{
                                                    url: `${window.location.origin}/news/${article.sys.id}`,
                                                    identifier: article.sys.id,
                                                    title: article.title
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Container>
                            </main>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Article
