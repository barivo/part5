import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible} className="hideTogglableContent">
        <button onClick={toggleVisible}>{props.showButtonLabel}</button>
      </div>

      <div style={showWhenVisible} className="showTogglableContent">
        {props.children}
        <button onClick={toggleVisible}>{props.removeButtonLabel}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
