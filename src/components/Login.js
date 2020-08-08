import React from 'react'
const Login = ({
  setUser,
  setUsername,
  username,
  setPassword,
  password,
  loginService,
  blogService,
  sendNotification,
  loginFormRef,
}) => {
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })

      setUser(user)
      setUsername('')
      setPassword('')
      if (user) {
        blogService.setToken(user.token)
      } else {
        sendNotification({ type: 'error', msg: 'wrong username or password' })
      }
      window.localStorage.setItem('loggedIn', JSON.stringify(user))
      loginFormRef.current.toggleVisible()
    } catch (exception) {
      console.log('Login error: ', exception)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
export default Login
