import React, { useState, useEffect, useContext } from 'react'
import { useBreakpoints } from 'react-device-breakpoints'
import { Context, Provider, Consumer } from './context'
import Select from 'components/Select'
import cx from 'classnames'
import styles from './styles.module.sass'

const Navigation = ({ children }) => {
  const device = useBreakpoints()
  const { index, setIndex, onChange } = useContext(Context)
  return device.isMobile || device.isLargeMobile || device.isTablet ? (
    <Select
      value={{ value: index, label: children[index].props.children }}
      options={React.Children.map(children, (child, i) => ({ value: i, label: child.props.children }))}
      onChange={v => {
        setIndex(v)
        onChange(v)
      }}
    />
  ) : (
    <div className={styles.nav}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          isActive: index === i,
          activateTab: onChange ? () => onChange(i) : () => setIndex(i)
        })
      )}
    </div>
  )
}

const Link = ({ isActive, isDisabled, activateTab, children }) => (
  <button
    disabled={isDisabled}
    className={cx([styles.link, isActive && styles.active])}
    onClick={isDisabled || isActive ? null : activateTab}
  >
    {children}
  </button>
)

const Panels = ({ children }) => {
  const { index } = useContext(Context)
  return children[index]
}

const Tabs = ({ children, active = 0, onChange }) => {
  const [index, setIndex] = useState(active)
  useEffect(() => {
    setIndex(active)
  }, [active])
  return <Provider value={{ index, setIndex, onChange }}>{children}</Provider>
}

Tabs.Navigation = Navigation
Tabs.Link = Link
Tabs.Panels = Panels

export default Tabs
export { Consumer }
