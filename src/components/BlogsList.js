import React from 'react'
import Blog from './Blog'

const BlogsList = ({
  user,
  setBlogs,
  blogs,
  setAlert,
  sendNotification,
  incrementLikes,
}) => {
  return (
    <div className="blogList">
      {user !== null &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              blogs={blogs}
              sendNotification={sendNotification}
              incrementLikes={incrementLikes}
            />
          ))}
    </div>
  )
}

export default BlogsList
