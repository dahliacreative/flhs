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

const handleEvents = action => () => {
    document[action]('mousedown', dettachFocusClass)
    document[action]('keyup', attachFocusClass)
    document[action]('touchstart', removeHoverClass)
}

export { dettachFocusClass, attachFocusClass, removeHoverClass, handleEvents }
