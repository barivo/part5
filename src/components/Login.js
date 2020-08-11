import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit" onClick={handleSubmit}>
          login
        </button>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default Login
