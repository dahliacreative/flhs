import React, { useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
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
    hooks.useMeta('FLHS :: Archive')
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

    const { loading, error, data } = useQuery(query.category ? queries.category : queries.archive, {
        variables,
        onCompleted: () => (wrapper.current.style.height = 'auto')
    })

    const collection = loading
        ? { skip: 0, limit: 0, total: 0 }
        : query.category
        ? data.category.linkedFrom.recordCollection
        : data.recordCollection

    const resetViewport = () => {
        window.scrollTo({
            top: main.current.offsetTop - 50,
            left: 0
        })
        wrapper.current.style.height = `${wrapper.current.scrollHeight}px`
    }

    const paginate = page => {
        resetViewport()
        query.page = page
        history.push({
            pathname: location.pathname,
            search: qs.stringify(query)
        })
    }

    const changeCategory = v => {
        resetViewport()
        if (v) {
            query.category = v
        } else {
            delete query.category
        }
        delete query.page
        history.push({
            pathname: location.pathname,
            search: qs.stringify(query)
        })
    }

    const changeOrder = v => {
        resetViewport()
        query.order = v
        history.replace({
            pathname: location.pathname,
            search: qs.stringify(query)
        })
    }

    return (
        <>
            <Banner id={data.category ? data.category.banner.sys.id : '6sRxVmIS2xjBgxxi47j9TD'} />
            <main ref={main}>
                <Container light pad>
                    <div ref={wrapper}>
                        {error ? (
                            <Error error={error} />
                        ) : (
                            <>
                                <ActionHeader>
                                    <ActionHeader.Column>
                                        <ActionHeader.Control>
                                            <ActionHeader.Results collection={collection} />
                                        </ActionHeader.Control>
                                    </ActionHeader.Column>
                                    <ActionHeader.Column>
                                        {!query.category && (
                                            <ActionHeader.Control>
                                                <ActionHeader.Label>Sort:</ActionHeader.Label>
                                                <Select
                                                    options={constants.SORT_OPTIONS}
                                                    value={
                                                        constants.SORT_OPTIONS.find(o => o.value === query.order) ||
                                                        constants.SORT_OPTIONS[0]
                                                    }
                                                    onChange={changeOrder}
                                                />
                                            </ActionHeader.Control>
                                        )}
                                        <ActionHeader.Control>
                                            <ActionHeader.Label>Category:</ActionHeader.Label>
                                            <Categories selected={query.category} onChange={changeCategory} />
                                        </ActionHeader.Control>
                                    </ActionHeader.Column>
                                </ActionHeader>
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <>
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
                                        {collection.total > 12 && (
                                            <Pagination
                                                activePage={parseInt(query.page, 10) || 1}
                                                onChange={paginate}
                                                itemsCountPerPage={collection.limit}
                                                totalItemsCount={collection.total}
                                                device={device}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </Container>
            </main>
        </>
    )
}

export default Archives
