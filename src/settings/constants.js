const BANNER_IMAGE_DIMENSIONS = {
    width: 2400,
    height: 900,
    resizeStrategy: 'FILL',
    resizeFocus: 'CENTER',
    quality: 40,
    format: 'JPG'
}

const CARD_IMAGE_DIMENSIONS = {
    width: 760,
    height: 440,
    resizeStrategy: 'FILL',
    resizeFocus: 'FACES',
    quality: 15,
    format: 'JPG'
}

const RECORD_IMAGE_DIMENSIONS = {
    width: 1845,
    quality: 40,
    format: 'JPG'
}

const BREAKPOINTS = {
    isLargeDesktop: '(min-width: 1280px)',
    isDesktop: '(max-width: 1279px) and (min-width: 1024px)',
    isTablet: '(max-width: 1023px) and (min-width: 768px)',
    isLargeMobile: '(max-width: 767px) and (min-width: 568px)',
    isMobile: '(max-width: 567px)'
}

const PAGINATION_LIMIT = 12

const SORT_OPTIONS = [
    {
        value: 'title_ASC',
        label: 'Alphabetically A-Z'
    },
    {
        value: 'title_DESC',
        label: 'Alphabetically Z-A'
    },
    {
        value: 'sys_firstPublishedAt_DESC',
        label: 'Date Added (Newest First)'
    },
    {
        value: 'sys_firstPublishedAt_ASC',
        label: 'Date Added (Oldest First)'
    }
]

const DISQUS_SHORTNAME = 'flhs'

export default {
    BANNER_IMAGE_DIMENSIONS,
    CARD_IMAGE_DIMENSIONS,
    BREAKPOINTS,
    PAGINATION_LIMIT,
    SORT_OPTIONS,
    DISQUS_SHORTNAME,
    RECORD_IMAGE_DIMENSIONS
}
