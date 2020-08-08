import React, { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import BlogsList from './components/BlogsList'
import CurrentUser from './components/CurrentUser'
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
      setUser(user)
      const currentUser = JSON.parse(loggedUserJSON)
      blogService.setToken(currentUser.token)
    }
  }, [])

  return (
    <div>
      <h2>Blogs</h2>
      {!user && (
        <Togglable
          ref={loginFormRef}
          showButtonLabel="login"
          removeButtonLabel="clear"
        >
          <Login
            setUser={setUser}
            setUsername={setUsername}
            username={username}
            password={password}
            setPassword={setPassword}
            loginService={loginService}
            blogService={blogService}
            sendNotification={sendNotification}
            loginFormRef={loginFormRef}
          />
        </Togglable>
      )}
      <CurrentUser user={user} handleLogOut={handleLogOut} />
      {alert.type !== null && notification()}
      <br />

      {user && (
        <Togglable
          ref={blogFormRef}
          showButtonLabel="create new blog"
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
      )}
      <br />

      <BlogsList
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        sendNotification={sendNotification}
      />
    </div>
  )
}

export default App
