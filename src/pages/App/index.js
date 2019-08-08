import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Breakpoints } from 'react-device-breakpoints'
import { client, constants } from 'settings'
import { handleEvents } from './helpers'
import Categories from 'pages/Categories'
import Archives from 'pages/Archives'
import Record from 'pages/Record'
import Sponsors from 'pages/Sponsors'
import Privacy from 'pages/Privacy'
import Terms from 'pages/Terms'
import Society from 'pages/Society'

import Header from 'components/Header'
import Footer from 'components/Footer'

import './styles.sass'

const App = () => {
    useEffect(() => {
        handleEvents('addEventListener')()
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
                        <Route exact path="/archives/records/:id" component={Record} />
                        <Route exact path="/sponsors/:page" component={Sponsors} />
                        <Route exact path="/privacy-policy" component={Privacy} />
                        <Route exact path="/terms-and-conditions" component={Terms} />
                        <Route exact path="/society/:page" component={Society} />
                    </Switch>
                    <Footer />
                </Router>
            </Breakpoints>
        </ApolloProvider>
    )
}

export default App
