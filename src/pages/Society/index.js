import React from 'react'
import Tabs from 'components/Tabs'
import Banner from 'components/Banner'
import Container from 'components/Container'
import { Link } from 'react-router-dom'
import { hooks } from 'settings'

import Committee from './committee'
import Newsletters from './newsletters'
import Publications from './publications'

const tabs = ['about', 'members', 'newsletters', 'publications']

const Society = ({ history, match }) => {
  const updateTab = i => {
    history.push(`/society/${tabs[i]}`)
  }
  hooks.useMeta('FLHS :: The Society')
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
              <Tabs.Link>Publications</Tabs.Link>
            </Tabs.Navigation>
          </Container>
          <Tabs.Panels>
            <div>
              <Container light pad>
                <div className="generic">
                  <h1>About the society</h1>
                </div>
                <div className="generic">
                  <p>
                    The Finedon Local History Society was founded in 2000 by a small group of local people who share an
                    interest in the history of Finedon and its inhabitants. In October 2001, the Society was fortunate
                    to be able to move its resources into the historically significant Friends’ Meeting House, on the
                    High Street in Finedon, courtesy of its then owner, the late Mr Jim Gibbard.
                  </p>
                  <p>
                    The historic significance of the Friends’ Meeting House offered a natural home for such a society,
                    it being the oldest surviving non-conformist place of worship in Northamptonshire. Built in 1690,
                    The Meeting House, originally sporting a thatched roof, was home to the Society of Friends,
                    otherwise known as the Quakers, who had a very strong presence in Finedon during that time. The
                    construction of the Meeting House was built on, what in those days, formed the extreme edge of
                    Finedon, in order to be as far away as possible from the Parish Church, whose doctrine its followers
                    did not share.
                  </p>
                  <p>
                    Today, the aims of the Finedon Local History Society are to research, record and promote the rich
                    history of Finedon and its inhabitants. At the present time the society holds over 2000 photographic
                    images and other items of Finedon memorabilia most of which have been kindly donated to the society.
                  </p>
                  <p>
                    The Society holds <Link to="/events">eleven monthly meetings</Link> each year, typically on the
                    fourth Monday of each month, covering a range of historical and social subjects of local, county or
                    national interest. It also produces three <Link to="/society/newsletters">newsletters</Link> a year
                    containing articles relating to Finedon’s rich past. The Society has also produced several
                    publications notably “The Yards of Finedon” by former chairman, the late Mr Malcolm Peet and
                    “Ironstone Quarries, Railways and Tramways around Finedon” by Mr Francis Terry. A full list of
                    society publications will soon be available for purchase on this website.
                  </p>
                  <p>
                    Currently the society has a paid-up membership of in excess of a hundred members, which includes a
                    number of “ex-pats” who still take a keen interest in Finedon. The Society is also able to give
                    presentations on a number of Finedon related subjects to organisations within the local community.
                  </p>
                  <p>
                    Sadly, in May 2019, the Society was given notice to move from the Friends’ Meeting House, due to its
                    impending sale. Meetings now take place in The Mission Room, Well Street, directly across "The
                    Green" from the Meeting House.
                  </p>
                  <p>
                    Monday mornings are usually “working mornings” between 10.00 am and 12.00 noon. If you are in the
                    locality please drop-in as you will be made most welcome with a cup of tea and a chat!
                  </p>
                  <p>
                    If you would like to join our society the please see the details on our{' '}
                    <Link to="/membership">membership page</Link> and if you would like to be a sponsor of this new
                    website please get in touch as directed on the <Link to="/contact">contact page</Link>.
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
            <div>
              <Publications />
            </div>
          </Tabs.Panels>
        </Tabs>
      </main>
    </>
  )
}

export default Society
