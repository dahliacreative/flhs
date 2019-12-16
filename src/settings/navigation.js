const primary = [
  {
    label: 'The Town',
    url: '/town'
  },
  {
    label: 'The Society',
    url: '/society/about',
    props: {
      isActive: (match, location) => location.pathname.includes('society')
    }
  },
  {
    label: 'Membership',
    url: '/membership',
    props: {
      isActive: (match, location) => location.pathname.includes('membership')
    }
  },
  {
    label: 'The Archives',
    url: '/archives/categories',
    props: {
      isActive: (match, location) => location.pathname.includes('archives')
    }
  },
  {
    label: 'Our Sponsors',
    url: '/sponsors/gold',
    props: {
      isActive: (match, location) => location.pathname.includes('sponsors')
    }
  }
]

const secondary = [
  {
    label: 'News',
    url: '/news'
  },
  {
    label: 'Events',
    url: '/events'
  },
  {
    label: 'Contact',
    url: '/contact'
  }
  // {
  //   label: 'Links',
  //   url: '/links'
  // }
]

const footer = [
  {
    label: 'Privacy Policy',
    url: '/privacy-policy'
  },
  {
    label: 'Terms & Conditions',
    url: '/terms-and-conditions'
  }
]

export default { primary, secondary, footer }
