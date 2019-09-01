import React from 'react'
import Tabs from 'components/Tabs'
import Banner from 'components/Banner'

const tabs = ['about', 'members', 'meetings']

const Society = ({ history, match }) => {
    const updateTab = i => {
        history.push(`/society/${tabs[i]}`)
    }
    return (
        <>
            <Banner id="4Ff7ywyStIPKlizfjuLhCK" />
            <main>
                <Tabs active={tabs.findIndex(p => p === match.params.page)} onChange={updateTab}>
                    <Tabs.Navigation>
                        <Tabs.Link>About the society</Tabs.Link>
                        <Tabs.Link>Committee Members</Tabs.Link>
                        <Tabs.Link>Committee Meetings</Tabs.Link>
                    </Tabs.Navigation>
                    <Tabs.Panels>
                        <div>
                            <p>About</p>
                        </div>
                        <div>
                            <p>Members</p>
                        </div>
                        <div>
                            <p>Meetings</p>
                        </div>
                    </Tabs.Panels>
                </Tabs>
            </main>
        </>
    )
}

export default Society
