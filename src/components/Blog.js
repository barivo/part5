import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, sendNotification, incrementLikes }) => {
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

  const handleAddingLikes = () => {
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    incrementLikes(updatedBlog)
  }

  const handleDelete = async () => {
    const result = await blogService.deleteBlog(blog.id)
    if (result) {
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs([...updatedBlogs])
    } else {
      sendNotification({
        type: 'error',
        msg: 'only blog owners can delete blogs',
      })
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <span className="blogTitle">
        {blog.title} {blog.author}
      </span>
      <button style={showCompactView} onClick={() => setVisible(true)}>
        view
      </button>
      <br />
      <span style={showFullView} className="togglableContent">
        {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={() => handleAddingLikes()}>like</button>
        <br />
        <button onClick={() => setVisible(false)}>hide</button>
        <br />
        <button onClick={() => handleDelete()}>delete</button>
      </span>
    </div>
  )
}

export default Blog
