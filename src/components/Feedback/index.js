import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Feedback } from '@material-ui/icons'
import cx from 'classnames'
import styles from './styles.module.sass'
import Select from 'components/Select'
import Button from 'components/Button'

const encode = data => {
    const formData = new FormData()
    Object.keys(data).forEach(k => {
        formData.append(k, data[k])
    })
    return formData
}

const FeedbackForm = ({ location: { pathname } }) => {
    const initialState = {
        type: '',
        name: '',
        file: {},
        page: pathname,
        message: ''
    }
    const options = [
        { value: 'general', label: 'General feedback about the website' },
        { value: 'specific', label: 'Specific feedback about this page' }
    ]
    const [state, setState] = useState(initialState)
    const [isOpen, toggle] = useState(false)
    const [status, setStatus] = useState()
    const handleSubmit = e => {
        e.preventDefault()
        const data = encode({ 'form-name': 'Feedback', ...state })
        fetch(pathname, {
            method: 'POST',
            body: data
        })
            .then(() => {
                setStatus('Form Submission Successful!')
                setTimeout(() => {
                    setState(initialState)
                    setStatus(null)
                    toggle(false)
                })
            })
            .catch(() => setStatus('Form Submission Failed!'))
    }
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
                {status ? (
                    <p>{status}</p>
                ) : (
                    <form
                        className={cx([styles.form, 'form'])}
                        netlify
                        method="POST"
                        name="Feedback"
                        onSubmit={handleSubmit}
                    >
                        <input type="hidden" id="page" name="page" value={pathname} />
                        <input type="hidden" name="form-name" value="Feedback" />
                        <div className="control">
                            <Select
                                placeholder="Feedback type"
                                id="type"
                                name="type"
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
                                name="name"
                                value={state.name}
                                onChange={e => setState({ ...state, name: e.target.value })}
                            />
                        </div>
                        <div className="control">
                            <textarea
                                placeholder="Your feedback"
                                id="message"
                                name="message"
                                value={state.message}
                                onChange={e => setState({ ...state, message: e.target.value })}
                            />
                        </div>
                        <div className="control">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={e => setState({ ...state, file: e.target.files[0] })}
                            />
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
                )}
            </div>
        </>
    )
}

export default withRouter(FeedbackForm)
