const BANNER_IMAGE_DIMENSIONS = {
  width: 2400,
  height: 900,
  resizeStrategy: 'FILL',
  resizeFocus: 'CENTER',
  quality: 40,
  format: 'JPG'
}

const CONTENT_IMAGE_DIMENSIONS = {
  width: 1600,
  quality: 60,
  format: 'JPG'
}

const AVATAR_IMAGE_DIMENSIONS = {
  width: 100,
  height: 100,
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
  quality: 30,
  format: 'JPG'
}

const PUBLICATION_IMAGE_DIMENSIONS = {
  width: 640,
  height: 853,
  resizeStrategy: 'FILL',
  resizeFocus: 'FACES',
  quality: 30,
  format: 'JPG'
}

const PROFILE_IMAGE_DIMENSIONS = {
  width: 760,
  height: 760,
  resizeStrategy: 'FILL',
  resizeFocus: 'FACES',
  quality: 30,
  format: 'JPG'
}

const FEATURE_IMAGE_DIMENSIONS = {
  width: 1280,
  height: 990,
  resizeStrategy: 'FILL',
  resizeFocus: 'FACES',
  quality: 30,
  format: 'JPG'
}

const RECORD_IMAGE_DIMENSIONS = {
  width: 1845,
  quality: 40,
  format: 'JPG'
}

const SPONSOR_IMAGE_DIMENSIONS = {
  width: 320,
  height: 140,
  format: 'PNG',
  resizeStrategy: 'FIT',
  quality: 40
}

const SPONSOR_LARGE_IMAGE_DIMENSIONS = {
  width: 640,
  height: 280,
  format: 'PNG',
  resizeStrategy: 'FIT',
  quality: 40
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
  RECORD_IMAGE_DIMENSIONS,
  SPONSOR_IMAGE_DIMENSIONS,
  SPONSOR_LARGE_IMAGE_DIMENSIONS,
  AVATAR_IMAGE_DIMENSIONS,
  FEATURE_IMAGE_DIMENSIONS,
  PROFILE_IMAGE_DIMENSIONS,
  CONTENT_IMAGE_DIMENSIONS,
  PUBLICATION_IMAGE_DIMENSIONS
}
