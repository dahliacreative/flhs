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
                    <div className="generic">
                        <Grid columns={device.isMobile ? 1 : 2}>
                            <Grid.Item>
                                <h3>For Society Enquires</h3>
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
                                    <a href="mailto:michael.britton@ntlworld.com">Michael Britton</a>
                                </p>
                            </Grid.Item>
                            <Grid.Item>
                                <h3>For Website Enquires or Submisssions</h3>
                                <p>
                                    <a href="mailto:simon@dahliacreative.com">Simon Sturgess</a>
                                </p>
                                <p>
                                    <a href="mailto:grahamrsherwood@icloud.com">Graham Sherwood</a>
                                </p>
                            </Grid.Item>
                        </Grid>
                    </div>
                </Container>
            </main>
        </>
    )
}

export default Contact
