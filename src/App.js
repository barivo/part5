/* eslint-disable no-unused-vars */
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
  // eslint-disable-next-line no-unused-vars
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

  const incrementLikes = async (updatedBlog) => {
    const newBlog = await blogService.updateBlog(updatedBlog)
    const updatedBlogs = blogs.filter((b) => b.id !== newBlog.id)
    setBlogs([...updatedBlogs, newBlog])
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService({ username, password })

      window.localStorage.setItem('loggedIn', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      if (user) {
        blogService.setToken(user.token)
      } else {
        sendNotification({ type: 'error', msg: 'wrong username or password' })
      }

      if (loginFormRef.current) loginFormRef.current.toggleVisible()
    } catch (exception) {
      console.log('Login error: ', exception)
    }
  }

  const addBlog = async (blog) => {
    blog.userId = user.id
    try {
      const newBlog = await blogService.createBlog(blog)
      setTitle('')
      setAuthor('')
      setUrl('')

      if (newBlog) {
        setBlogs([...blogs, newBlog])
        sendNotification({
          type: 'success ',
          msg: `a new blog: ${newBlog.title} by ${user.name} was added`,
        })
        blogFormRef.current.toggleVisible()
      }
    } catch (exception) {
      console.log('Blog creation error: ', exception)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedIn')
  }

  const notification = () => {
    const alertClass = alert.type === 'error' ? 'error' : 'success'
    const borderStyle =
      alert.type === 'error' ? 'solid 5px red' : 'solid 5px green'
    return (
      <h2
        className={alertClass}
        style={{ border: borderStyle, padding: '15px' }}
      >
        {alert.type} {alert.msg}
      </h2>
    )
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedIn')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      setUser(currentUser)
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
          <Login handleLogin={handleLogin} />
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
          <CreateBlog addBlog={addBlog} />
        </Togglable>
      )}
      <br />
      <BlogsList
        user={user}
        blogs={blogs}
        incrementLikes={incrementLikes}
        setBlogs={setBlogs}
        sendNotification={sendNotification}
      />
    </div>
  )
}

export default App
