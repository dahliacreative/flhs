import React from 'react'

import Tabs from 'components/Tabs'

const tabs = ['about', 'members', 'meetings']

const Society = ({ history, match }) => {
    const updateTab = i => {
        history.push(`/society/${tabs[i]}`)
    }
    return (
        <>
            <Tabs active={tabs.findIndex(p => p === match.params.page)} onChange={updateTab}>
                <Tabs.Navigation>
                    <Tabs.Link>About the society</Tabs.Link>
                    <Tabs.Link>Committee Members</Tabs.Link>
                    <Tabs.Link>Committee Meetings</Tabs.Link>
                </Tabs.Navigation>
            </Tabs>
        </>
    )
}

export default Society
