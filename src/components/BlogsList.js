import React from 'react'
import Blog from './Blog'

const BlogsList = ({ user, blogs }) => {
  return (
    <div>
      {user !== null && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default BlogsList
