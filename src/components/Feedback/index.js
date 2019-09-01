import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.module.sass'
import Select from 'components/Select'

const Feedback = ({ location: { pathname } }) => {
    const initialState = {
        type: '',
        name: '',
        file: '',
        page: pathname,
        message: ''
    }
    const options = [
        { value: 'general', label: 'General feedback about the website' },
        { value: 'specific', label: 'Specific feedback about this page' }
    ]
    const [state, setState] = useState(initialState)
    const [isOpen, toggle] = useState(false)
    useEffect(() => {
        setState(initialState)
        toggle(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])
    return (
        <div className={cx([styles.feedback, isOpen && styles.open])}>
            <button className={styles.button} onClick={() => toggle(!isOpen)}>
                Feedback
            </button>
            <form className={cx([styles.form, 'form'])} data-netlify="true" action={pathname}>
                <label htmlFor="type">Feedback type</label>
                <Select
                    id="type"
                    options={options}
                    onChange={v => setState({ ...state, type: v.value })}
                    value={options.find(o => o.value === state.type)}
                />
                <label htmlFor="name">Your name</label>
                <input
                    type="text"
                    id="name"
                    value={state.name}
                    onChange={e => setState({ ...state, name: e.target.value })}
                />
                <label htmlFor="message">Your Feedback</label>
                <textarea
                    id="message"
                    value={state.message}
                    onChange={e => setState({ ...state, message: e.target.value })}
                />
                <label htmlFor="file">Attachment</label>
                <input type="file" id="file" onChange={e => setState({ ...state, file: e.target.files[0] })} />
            </form>
        </div>
    )
}

export default withRouter(Feedback)
