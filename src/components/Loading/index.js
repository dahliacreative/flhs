import React, { useState, useEffect } from 'react'

let timer

const Loading = () => {
    const [display, toggleDisplay] = useState(false)
    useEffect(() => {
        timer = setTimeout(() => {
            toggleDisplay(true)
        }, 300)
        return () => clearTimeout(timer)
    }, [toggleDisplay])
    return display ? <p>Loading...</p> : null
}

export default Loading
