const dettachFocusClass = () => {
    document.body.classList.remove('show-focus')
}

const attachFocusClass = e => {
    if (e.keyCode === 9 || e.keyCode === 13) {
        document.body.classList.add('show-focus')
    }
}

const removeHoverClass = () => {
    document.body.classList.remove('show-hovers')
    document.body.classList.add('hide-hovers')
    document.removeEventListener('touchstart', removeHoverClass)
}

const bindEvents = () => {
    document.addEventListener('mousedown', dettachFocusClass)
    document.addEventListener('keyup', attachFocusClass)
    document.addEventListener('touchstart', removeHoverClass)
}

const unbindEvents = () => {
    document.removeEventListener('mousedown', dettachFocusClass)
    document.removeEventListener('keyup', attachFocusClass)
    document.removeEventListener('touchstart', removeHoverClass)
}

export { dettachFocusClass, attachFocusClass, removeHoverClass, bindEvents, unbindEvents }
