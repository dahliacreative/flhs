import React from 'react'
import ReactSelect from 'react-select'
import { useBreakpoints } from 'react-device-breakpoints'
import styles from './styles.module.sass'

const theme = provided => ({
    ...provided,
    colors: {
        ...provided.colors,
        primary: '#c9b25d',
        primary75: '#d7c686',
        primary50: '#e4d9af',
        primary25: '#f1ecd7'
    }
})

const custom = {
    indicatorSeparator: () => ({
        display: 'none'
    }),
    control: provided => ({
        ...provided,
        borderRadius: 50,
        minWidth: 220,
        fontFamily: 'Roboto, sans-serif',
        color: '#00172d',
        borderColor: '#c9b25d !important',
        cursor: 'pointer'
    }),
    valueContainer: provided => ({
        ...provided,
        paddingLeft: 15
    }),
    menu: provided => ({
        ...provided,
        fontFamily: 'Roboto, sans-serif',
        overflow: 'hidden'
    }),
    menuList: provided => ({
        ...provided,
        padding: 0
    }),
    option: provided => ({
        ...provided,
        cursor: 'pointer'
    }),
    dropdownIndicator: provided => ({
        ...provided,
        color: '#00172d'
    })
}

const Select = ({ options, onChange, ...props }) => {
    const device = useBreakpoints()
    return device.isTouchDevice ? (
        <div className={styles.select}>
            <select onChange={e => onChange(e.target.value)} value={props.value.value}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
            </svg>
        </div>
    ) : (
        <ReactSelect styles={custom} theme={theme} options={options} onChange={v => onChange(v.value)} {...props} />
    )
}

export default Select
