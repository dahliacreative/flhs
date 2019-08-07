import React from 'react'
import Select from 'components/Select'
import { Query } from 'react-apollo'
import queries from './queries'

const Categories = ({ selected, onChange }) => (
    <Query query={queries.categories}>
        {({ loading, error, data }) => {
            const options = data.categoryCollection
                ? data.categoryCollection.items.map(c => ({
                      value: c.sys.id,
                      label: c.title
                  }))
                : []
            options.unshift({
                value: '',
                label: 'All'
            })
            const value = options.find(o => o.value === selected) || options[0]
            return <Select isLoading={loading} value={value} onChange={onChange} options={options} />
        }}
    </Query>
)

export default Categories
