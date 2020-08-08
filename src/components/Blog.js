import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
        <br />
        <button onClick={() => setVisible(false)}>hide</button>
      </span>
    </div>
  )
}

export default Blog
