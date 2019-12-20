import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
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
import Contact from 'pages/Contact'
import Events from 'pages/Events'
import Event from 'pages/Event'
import Articles from 'pages/Articles'
import Article from 'pages/Article'
import Homepage from 'pages/Homepage'
import Town from 'pages/Town'
import Links from 'pages/Links'
import Membership from 'pages/Membership'
import FourOhFour from 'pages/FourOhFour'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Feedback from 'components/Feedback'

import './styles.sass'

ReactGA.initialize('UA-84643905-2')

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
            <Route exact path="/" component={Homepage} />
            <Route exact path="/archives" component={Archives} />
            <Route exact path="/archives/categories" component={Categories} />
            <Route exact path="/archives/records/:id" component={Record} />
            <Route exact path="/sponsors/:page" component={Sponsors} />
            <Route exact path="/privacy-policy" component={Privacy} />
            <Route exact path="/terms-and-conditions" component={Terms} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/society/:page" component={Society} />
            <Route exact path="/events/:id" component={Event} />
            <Route exact path="/news" component={Articles} />
            <Route exact path="/news/:id" component={Article} />
            <Route exact path="/town" component={Town} />
            <Route exact path="/links" component={Links} />
            <Route exact path="/membership" component={Membership} />
            <Route exact path="*" component={FourOhFour} />
          </Switch>
          <Footer />
          <Feedback />
        </Router>
      </Breakpoints>
    </ApolloProvider>
  )
}

export default App
