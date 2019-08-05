import React, { useState, useRef } from 'react'
import { Query } from 'react-apollo'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants } from 'settings'
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
    const device = useBreakpoints()
    const query = qs.parse(location.search) || {}
    const [page, updatePage] = useState(0)
    const [modalIsOpen, toggleModal] = useState(false)
    const main = useRef()
    const wrapper = useRef()

    const variables = {
        transform: constants.CARD_IMAGE_DIMENSIONS,
        skip: page * constants.PAGINATION_LIMIT,
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
            updatePage(page - 1)
        }, 750)
    }

    const closeModal = () => {
        toggleModal(false)
        setTimeout(() => {
            delete query.record
            history.push({
                pathname: location.pathname,
                search: qs.stringify(query)
            })
        }, 500)
    }

    const changeCategory = v => {
        console.log(v)
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
                    if (loading || error) {
                        return null
                    }
                    return <Banner {...data.pageBanner} />
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
                                        <Pagination
                                            activePage={page + 1}
                                            onChange={paginate}
                                            itemsCountPerPage={collection.limit}
                                            totalItemsCount={collection.total}
                                            device={device}
                                        />
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                </Container>
            </main>
            {/* <Modal isOpen={modalIsOpen} onClose={closeModal} /> */}
        </>
    )
}

export default Archives
