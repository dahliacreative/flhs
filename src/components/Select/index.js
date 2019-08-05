import React from 'react'
import ReactSelect from 'react-select'

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

const styles = {
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

const Select = props => <ReactSelect styles={styles} theme={theme} {...props} />

export default Select
