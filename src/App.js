import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import BlogsList from './components/BlogsList'
import BlogHeader from './components/Header'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [alert, setAlert] = useState({ type: null, msg: '' })

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const handleSubmit = async event => {
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

  const sendNotification = ({ type, msg }) => {
    setAlert({ type, msg })
    setTimeout(() => setAlert({ type: null, msg: null }), 5000)
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedIn')
  }

  const notification = () => (
    <h2>
      {alert.kind} {alert.msg}
    </h2>
  )

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedIn')
    if (loggedUserJSON && user) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Togglable
        ref={loginFormRef}
        showButtonLabel="login"
        removeButtonLabel="clear"
      >
        <Login
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </Togglable>
      <BlogHeader user={user} handleLogOut={handleLogOut} />
      {alert.type !== null && notification()}
      <br />

      <Togglable
        ref={blogFormRef}
        showButtonLabel="new note"
        removeButtonLabel="cancel"
      >
        <CreateBlog
          user={user}
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          blogs={blogs}
          setBlogs={setBlogs}
          sendNotification={sendNotification}
          blogFormRef={blogFormRef}
          blogService={blogService}
        />
      </Togglable>
      <br />

      <BlogsList user={user} blogs={blogs} />
    </div>
  )
}

export default App
