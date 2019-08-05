import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Breakpoints } from 'react-device-breakpoints'
import { client, constants } from 'settings'
import { handleEvents } from './helpers'
import Categories from 'pages/Categories'
import Archives from 'pages/Archives'
import Header from 'components/Header'
import Footer from 'components/Footer'
import './styles.sass'

const App = () => {
    useEffect(() => {
        handleEvents('addEventListener')
        return handleEvents('removeEventListener')
    }, [])
    return (
        <ApolloProvider client={client}>
            <Breakpoints {...constants.BREAKPOINTS}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/archives" component={Archives} />
                        <Route exact path="/archives/categories" component={Categories} />
                    </Switch>
                    <Footer />
                </Router>
            </Breakpoints>
        </ApolloProvider>
    )
}

export default App
