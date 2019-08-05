import { useEffect } from 'react'

const useMeta = title =>
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = title
    }, [title])

export default { useMeta }
