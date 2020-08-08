import React from 'react'

const blogHeader = ({ user, handleLogOut }) => {
  const header = () => (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={() => handleLogOut()}>logout</button>
      <br />
    </div>
  )
  return <> {user !== null && header()}</>
}

export default blogHeader
