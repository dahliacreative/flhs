import React from 'react'
import { useBreakpoints } from 'react-device-breakpoints'
import { hooks } from 'settings'
import Container from 'components/Container'
import Banner from 'components/Banner'
import Grid from 'components/Grid'

const Contact = () => {
  hooks.useMeta('FLHS :: Contact Us')
  const device = useBreakpoints()
  return (
    <>
      <Banner id="2wOooQpjR5BgLNzefhqSKO" />
      <main>
        <Container light pad>
          <Grid columns={device.isMobile ? 1 : 2}>
            <Grid.Item>
              <div className="generic">
                <h3>For Society Enquiries</h3>
                <p>
                  Finedon Local History Society
                  <br />
                  c/o 42 Belvoir Drive
                  <br />
                  Barton Seagrave
                  <br />
                  Kettering
                  <br />
                  NN15 6RB
                </p>
                <p>
                  <a href="mailto:finedonlhs@outlook.com">Michael Britton</a>
                </p>
              </div>
            </Grid.Item>
            <Grid.Item>
              <div className="generic">
                <h3>For Website Enquiries, Content Submissions or Sponsorship Opportunities</h3>
                <p>
                  <a href="mailto:grahamrsherwood@icloud.com">Graham Sherwood</a>
                </p>
              </div>
            </Grid.Item>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default Contact
