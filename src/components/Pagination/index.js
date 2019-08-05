import React from 'react'
import ReactPagination from 'react-js-pagination'
import styles from './styles.module.sass'

const classes = {
    innerClass: styles.wrapper,
    itemClass: styles.item,
    activeClass: styles.active,
    linkClass: styles.link,
    linkClassPrev: styles.prev,
    linkClassNext: styles.next
}

const config = {
    prevPageText: 'Previous',
    nextPageText: 'Next',
    hideFirstLastPages: true
}

const Pagination = ({ device, ...props }) => (
    <ReactPagination {...config} {...props} {...classes} pageRangeDisplayed={device.isMobile ? 3 : 5} />
)

export default Pagination
