import React from 'react'
import { hooks } from 'settings'
import Container from 'components/Container'
import Banner from 'components/Banner'
import form from 'images/FLHS Membership & GA.pdf'

const Membership = () => {
  hooks.useMeta('FLHS :: Membership')
  return (
    <>
      <Banner id="ArC0Va9y1aqBBMKqyBEF5" />
      <main>
        <Container light pad>
          <div className="generic">
            <h3>Join the society</h3>
            <p>
              We are currently working on being able to accept memberships online, in the mean time if you would like to
              become a member of the society, please download and complete the membership form attached below.
            </p>
            <p>
              <a href={form} download target="_blank" rel="noopener noreferrer">
                Membership application form.
              </a>
            </p>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Membership
