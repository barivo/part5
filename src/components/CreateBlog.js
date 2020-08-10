import React, { useState } from 'react'

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = { title: title, author: author, url: url }
    addBlog(blog)
  }

  return (
    <form className="blogForm" onSubmit={handleCreate}>
      <h2>create new</h2>
      title
      <input
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />
      author
      <input
        id="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url
      <input
        id="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">create</button>
    </form>
  )
}
export default CreateBlog
