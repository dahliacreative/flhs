import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Feedback } from '@material-ui/icons'
import cx from 'classnames'
import styles from './styles.module.sass'
import Select from 'components/Select'
import Button from 'components/Button'

const FeedbackForm = ({ location: { pathname } }) => {
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
        <>
            <button className={styles.button} onClick={() => toggle(!isOpen)}>
                <Feedback />
            </button>
            <div className={cx([styles.overlay, isOpen && styles.open])} />
            <div className={cx([styles.feedback, isOpen && styles.open])}>
                <h3>Leave us some feedback</h3>
                <form className={cx([styles.form, 'form'])} data-netlify="true" action={pathname}>
                    <div className="control">
                        <Select
                            placeholder="Feedback type"
                            id="type"
                            options={options}
                            onChange={v => setState({ ...state, type: v.value })}
                            value={options.find(o => o.value === state.type)}
                        />
                    </div>
                    <div className="control">
                        <input
                            placeholder="Your name"
                            type="text"
                            id="name"
                            value={state.name}
                            onChange={e => setState({ ...state, name: e.target.value })}
                        />
                    </div>
                    <div className="control">
                        <textarea
                            placeholder="Your feedback"
                            id="message"
                            value={state.message}
                            onChange={e => setState({ ...state, message: e.target.value })}
                        />
                    </div>
                    <div className="control">
                        <input type="file" id="file" onChange={e => setState({ ...state, file: e.target.files[0] })} />
                    </div>
                    <div className="control actions">
                        <Button type="button" onClick={() => toggle(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" secondary>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default withRouter(FeedbackForm)
