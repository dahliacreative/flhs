import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Breakpoints } from 'react-device-breakpoints'
import { client, constants } from 'settings'
import { bindEvents, unbindEvents } from './helpers'
import Categories from 'pages/Categories'
import Header from 'components/Header'
import Footer from 'components/Footer'
import './styles.sass'

const App = () => {
    useEffect(() => {
        bindEvents()
        return unbindEvents
    }, [])
    return (
        <ApolloProvider client={client}>
            <Breakpoints {...constants.BREAKPOINTS}>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/archives/categories" component={Categories} />
                    </Switch>
                    <Footer />
                </Router>
            </Breakpoints>
        </ApolloProvider>
    )
}

export default App
