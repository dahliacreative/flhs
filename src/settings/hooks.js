import { useEffect } from 'react'
import ReactGA from 'react-ga'

const useMeta = title =>
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = title
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [title])

export default { useMeta }
