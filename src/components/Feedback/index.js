import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Feedback } from '@material-ui/icons'
import cx from 'classnames'
import styles from './styles.module.sass'
import Select from 'components/Select'
import Button from 'components/Button'
import Loading from 'components/Loading'

const encode = data => {
    const formData = new FormData()
    Object.keys(data).forEach(k => {
        formData.append(k, data[k])
    })
    return formData
}

const FeedbackForm = ({ location: { pathname } }) => {
    const initialState = {
        type: 'general',
        name: '',
        email: '',
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
    const [isLoading, setLoading] = useState(false)
    const handleSubmit = e => {
        e.preventDefault()
        const data = encode({ 'form-name': 'Feedback', ...state })
        setLoading(true)
        fetch(pathname, {
            method: 'POST',
            body: data
        })
            .then(() => {
                setLoading(false)
                setStatus('Thank you for your feedback!')
            })
            .catch(() => {
                setLoading(false)
                setStatus(
                    'We were unable to subit your feedback, please try again later. If this problem persists, please contact simon@dahliacreative.com.'
                )
            })
    }
    const close = () => {
        toggle(false)
        setTimeout(() => {
            setStatus(null)
            setState(initialState)
        }, 500)
    }
    useEffect(() => {
        setState(initialState)
        toggle(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])
    return (
        <>
            <button className={styles.button} onClick={isOpen ? close : () => toggle(true)}>
                <Feedback />
            </button>
            <div className={cx([styles.overlay, isOpen && styles.open])} />
            <div className={cx([styles.feedback, isOpen && styles.open])}>
                <h3>Leave us some feedback</h3>
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {status ? (
                            <form>
                                <p>{status}</p>
                                <div className="control actions">
                                    <Button type="button" onClick={close}>
                                        Finish
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <form className={cx([styles.form, 'form'])} onSubmit={handleSubmit}>
                                <input type="hidden" id="page" name="page" value={pathname} />
                                <input type="hidden" name="form-name" value="Feedback" />
                                <div className="control">
                                    <Select
                                        placeholder="Feedback type"
                                        id="type"
                                        name="type"
                                        required
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
                                        required
                                        onChange={e => setState({ ...state, name: e.target.value })}
                                    />
                                </div>
                                <div className="control">
                                    <input
                                        placeholder="Your email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        required
                                        onChange={e => setState({ ...state, email: e.target.value })}
                                    />
                                </div>
                                <div className="control">
                                    <textarea
                                        placeholder="Your feedback"
                                        id="message"
                                        name="message"
                                        required
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
                                    <Button type="button" onClick={close}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" secondary>
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default withRouter(FeedbackForm)
