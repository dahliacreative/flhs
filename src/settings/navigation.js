const primary = [
    {
        label: 'The Town',
        url: '/town'
    },
    {
        label: 'The Society',
        url: '/society'
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
        url: '/sponsors'
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
]

const footer = [
    {
        label: 'Privacy Policy',
        url: '/privacy-policy'
    },
    {
        label: 'Terms & Conditions',
        url: '/terms-and-conditions'
    },
    {
        label: 'Sitemap',
        url: '/sitemap'
    }
]

export default { primary, secondary, footer }
