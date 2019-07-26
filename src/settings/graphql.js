import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`,
    request: async operation => {
        operation.setContext({
            headers: {
                authorization: `Bearer ${process.env.REACT_APP_CDA_TOKEN}`
            }
        })
    }
})

export default client
