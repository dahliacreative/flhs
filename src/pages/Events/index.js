import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useBreakpoints } from 'react-device-breakpoints'
import { constants, hooks } from 'settings'
import Event, { EventFragment } from 'components/Event'
import Banner from 'components/Banner'
import Loading from 'components/Loading'
import Tabs from 'components/Tabs'
import Error from 'components/Error'
import Container from 'components/Container'
import Grid from 'components/Grid'
import dayjs from 'dayjs'

const query = gql`
  ${EventFragment}
  query Events($transform: ImageTransformOptions!) {
    eventCollection(order: date_ASC) {
      items {
        ...EventFragment
      }
    }
  }
`

const Events = ({ client, history, match }) => {
  hooks.useMeta('FLHS :: Events')
  const device = useBreakpoints()
  const { loading, error, data } = useQuery(query, {
    variables: { transform: constants.CARD_IMAGE_DIMENSIONS }
  })
  const [tab, setTab] = useState(0)
  return (
    <>
      <Banner id="1vBuKgF9Of8qiZebVd2jiN" />
      <main className="tabs">
        {error ? (
          <Error error={error} />
        ) : (
          <>
            {loading ? (
              <Loading />
            ) : (
              <Tabs active={tab} onChange={setTab}>
                <Container pad>
                  <Tabs.Navigation>
                    <Tabs.Link>Up Coming Events</Tabs.Link>
                    <Tabs.Link>Past Events</Tabs.Link>
                  </Tabs.Navigation>
                </Container>
                <Container light pad>
                  <Tabs.Panels>
                    <div>
                      <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                        {data.eventCollection.items
                          .filter(e => dayjs.utc(e.date) >= dayjs.utc())
                          .map(event => (
                            <Grid.Item key={event.sys.id}>
                              <Event {...event} />
                            </Grid.Item>
                          ))}
                      </Grid>
                    </div>
                    <div>
                      <Grid columns={device.isMobile ? 1 : device.isLargeMobile || device.isTablet ? 2 : 3}>
                        {data.eventCollection.items
                          .filter(e => dayjs.utc(e.date) < dayjs.utc())
                          .map(event => (
                            <Grid.Item key={event.sys.id}>
                              <Event {...event} />
                            </Grid.Item>
                          ))}
                      </Grid>
                    </div>
                  </Tabs.Panels>
                </Container>
              </Tabs>
            )}
          </>
        )}
      </main>
    </>
  )
}

export default Events
