import React, { useRef } from 'react'
import { Query } from 'react-apollo'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Banner from 'components/Banner'
import Record from 'components/Record'
import Loading from 'components/Loading'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'
import Pagination from 'components/Pagination'
import ActionHeader from 'components/ActionHeader'
import Select from 'components/Select'
import Categories from './categories'
import queries from './queries'
import qs from 'query-string'

const Archives = ({ location, history }) => {
    hooks.useMeta('FLHS :: The Archives')
    const device = useBreakpoints()
    const query = qs.parse(location.search) || {}
    const main = useRef()
    const wrapper = useRef()
    const variables = {
        transform: constants.CARD_IMAGE_DIMENSIONS,
        skip: query.page ? (query.page - 1) * constants.PAGINATION_LIMIT : 0,
        limit: constants.PAGINATION_LIMIT,
        order: query.order || 'title_ASC'
    }

    if (query.category) {
        variables.categoryId = query.category
    }

    const paginate = page => {
        window.scrollTo({
            top: main.current.offsetTop - 50,
            left: 0,
            behavior: 'smooth'
        })
        wrapper.current.style.height = wrapper.current.style.scrollHeight
        setTimeout(() => {
            query.page = page
            history.push({
                pathname: location.pathname,
                search: qs.stringify(query)
            })
            wrapper.current.style.height = 'auto'
        }, 750)
    }

    const changeCategory = v => {
        if (v.value) {
            query.category = v.value
        } else {
            delete query.category
        }
        history.push({
            pathname: location.pathname,
            search: qs.stringify(query)
        })
    }

    const changeOrder = v => {
        query.order = v.value
        history.replace({
            pathname: location.pathname,
            search: qs.stringify(query)
        })
    }

    return (
        <>
            <Query
                query={queries.banner}
                variables={{
                    bannerId: '6sRxVmIS2xjBgxxi47j9TD',
                    bannerTransform: constants.BANNER_IMAGE_DIMENSIONS
                }}
            >
                {({ loading, error, data }) => {
                    return <Banner {...data.pageBanner} loading={loading} error={error} />
                }}
            </Query>
            <main ref={main}>
                <Container light pad>
                    <div ref={wrapper}>
                        <Query query={query.category ? queries.category : queries.archive} variables={variables}>
                            {({ loading, error, data }) => {
                                if (loading) return <Loading />
                                if (error) return <Error error={error} />
                                const collection = query.category
                                    ? data.category.linkedFrom.recordCollection
                                    : data.recordCollection
                                return (
                                    <>
                                        <ActionHeader>
                                            <ActionHeader.Column>
                                                <ActionHeader.Control>
                                                    <ActionHeader.Results collection={collection} />
                                                </ActionHeader.Control>
                                            </ActionHeader.Column>
                                            <ActionHeader.Column>
                                                <ActionHeader.Control>
                                                    <ActionHeader.Label>Category:</ActionHeader.Label>
                                                    <Categories selected={query.category} onChange={changeCategory} />
                                                </ActionHeader.Control>
                                                {!query.category && (
                                                    <ActionHeader.Control>
                                                        <ActionHeader.Label>Sort:</ActionHeader.Label>
                                                        <Select
                                                            options={constants.SORT_OPTIONS}
                                                            value={
                                                                constants.SORT_OPTIONS.find(
                                                                    o => o.value === query.order
                                                                ) || constants.SORT_OPTIONS[0]
                                                            }
                                                            onChange={changeOrder}
                                                        />
                                                    </ActionHeader.Control>
                                                )}
                                            </ActionHeader.Column>
                                        </ActionHeader>
                                        <Grid
                                            columns={
                                                device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3
                                            }
                                        >
                                            {collection.items.map(record => (
                                                <Grid.Item key={record.sys.id}>
                                                    <Record
                                                        {...record}
                                                        location={location}
                                                        hideCategories={query.category ? true : false}
                                                        categoryClick={changeCategory}
                                                    />
                                                </Grid.Item>
                                            ))}
                                        </Grid>
                                        {collection.total > 24 && (
                                            <Pagination
                                                activePage={parseInt(query.page, 10) || 1}
                                                onChange={paginate}
                                                itemsCountPerPage={collection.limit}
                                                totalItemsCount={collection.total}
                                                device={device}
                                            />
                                        )}
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                </Container>
            </main>
        </>
    )
}

export default Archives
