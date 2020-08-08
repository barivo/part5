import React from 'react'
import Blog from './Blog'

const BlogsList = ({ user, setBlogs, blogs }) => {
  return (
    <div>
      {user !== null &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
          ))}
    </div>
  )
}

export default BlogsList
