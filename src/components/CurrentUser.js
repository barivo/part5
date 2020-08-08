import React from 'react'

const currentUser = ({ user, handleLogOut }) => {
  const status = () => (
    <div>
      {user.name} logged in
      <button onClick={() => handleLogOut()}>logout</button>
    </div>
  )
  return <> {user !== null && status()}</>
}

export default currentUser
