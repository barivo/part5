import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, sendNotification }) => {
  const [visible, setVisible] = useState(false)
  const showCompactView = { display: visible ? 'none' : '' }
  const showFullView = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikesChange = async () => {
    //
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    const newBlog = await blogService.updateBlog(updatedBlog)
    const updatedBlogs = blogs.filter(b => b.id !== newBlog.id)
    setBlogs([...updatedBlogs, newBlog])
  }
  const handleDelete = async () => {
    const result = await blogService.deleteBlog(blog.id)
    if (result) {
      const updatedBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs([...updatedBlogs])
    } else {
      sendNotification({
        type: 'error',
        msg: 'only blog owners can delete blogs',
      })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={showCompactView} onClick={() => setVisible(true)}>
        view
      </button>
      <br />
      <span style={showFullView}>
        {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={() => handleLikesChange()}>like</button>
        <br />
        <button onClick={() => setVisible(false)}>hide</button>
        <br />
        <button onClick={() => handleDelete()}>delete</button>
      </span>
    </div>
  )
}

export default Blog
