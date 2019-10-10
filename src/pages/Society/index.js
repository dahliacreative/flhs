import React from 'react'
import Tabs from 'components/Tabs'
import Banner from 'components/Banner'
import Container from 'components/Container'

import Committee from './committee'
import Newsletters from './newsletters'

const tabs = ['about', 'members', 'newsletters']

const Society = ({ history, match }) => {
    const updateTab = i => {
        history.push(`/society/${tabs[i]}`)
    }
    return (
        <>
            <Banner id="4Ff7ywyStIPKlizfjuLhCK" />
            <main className="tabs">
                <Tabs active={tabs.findIndex(p => p === match.params.page)} onChange={updateTab}>
                    <Container pad>
                        <Tabs.Navigation>
                            <Tabs.Link>About the society</Tabs.Link>
                            <Tabs.Link>Committee Members</Tabs.Link>
                            <Tabs.Link>Newsletters</Tabs.Link>
                        </Tabs.Navigation>
                    </Container>
                    <Tabs.Panels>
                        <div>
                            <p>About</p>
                        </div>
                        <div>
                            <Committee />
                        </div>
                        <div>
                            <Newsletters />
                        </div>
                    </Tabs.Panels>
                </Tabs>
            </main>
        </>
    )
}

export default Society
