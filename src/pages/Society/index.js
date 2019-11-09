import React from 'react'
import Tabs from 'components/Tabs'
import Banner from 'components/Banner'
import Container from 'components/Container'
import { Link } from 'react-router-dom'

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
                            <Container light pad>
                                <div className="generic">
                                    <p>
                                        The Finedon Local History Society was founded in 2000 by a group of local people
                                        with an interest in the history of Finedon.
                                    </p>
                                    <p>
                                        On Saturday 21st October 2001 the society was fortunate enough to be able to
                                        move into the Friends’ Meeting House, High Street Finedon courtesy of the late
                                        Mr Jim Gibbard.
                                    </p>
                                    <p>
                                        The historic link and significance of the Friends’ Meeting House as a home for
                                        the society cannot be understated. The Friends' Meeting House is the oldest
                                        surviving non-conformist place of worship in Northamptonshire. It was built in
                                        1690, originally with a thatched roof, for the Society of Friends, otherwise
                                        known as the Quakers. The Quaker movement was very strong in Finedon and at the
                                        time of its construction it was built on the extreme edge of Finedon to be as
                                        far away as possible from the Parish Church.
                                    </p>
                                    <p>
                                        The aims of the society are to research, record and promote the rich history of
                                        Finedon and its inhabitants. At the present time the society holds over 2000
                                        photographs and items of Finedon memorabilia most of which have been kindly
                                        donated to the society.
                                    </p>
                                    <p>
                                        The society holds <Link to="/events">ten meetings a year</Link>, usually on the
                                        fourth Monday of the month, on a range of historical and social subjects of
                                        local, county or national interest. It also produces three{' '}
                                        <Link to="/society/newsletters">newsletters</Link> a year containing articles
                                        relating to Finedon’s past. It has also produced various publications notably
                                        “The Yards of Finedon” by our chairman Mr Malcolm Peet and “Ironstone Quarries,
                                        Railways and Tramways around Finedon” by Mr Francis Terry. A full list of
                                        society publications are available for purchase.
                                    </p>
                                    <p>
                                        The society has a membership of over 100 members including a number of “ex-pats”
                                        who still take a keen interest in Finedon. The society are able to give
                                        presentations on a number of Finedon related subjects to organisations within
                                        the local community.
                                    </p>
                                    <p>
                                        Since May 2019 the Society was given notice to move from the Meeting House and
                                        we now use the Mission Room, Well Street, across "The Green" from the Meeting
                                        House. A location map of the Mission Room can be found on the Meetings Page.
                                    </p>
                                    <p>
                                        Monday mornings is a usually a “working morning” between 10.00 am and 12.00
                                        noon. If you are in the locality please drop-in as you would be made most
                                        welcome with a cup of tea and a chat!
                                    </p>
                                </div>
                            </Container>
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
