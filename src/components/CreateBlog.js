import React from 'react'

const CreateBlog = ({
  user,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  blogs,
  setBlogs,
  sendNotification,
  blogFormRef,
  blogService,
}) => {
  const handleCreate = async event => {
    event.preventDefault()
    try {
      const blog = { title: title, author: author, url: url, userId: user.id }
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

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      title
      <input
        type="text"
        label="title"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <br />
      author
      <input
        type="text"
        label="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      url
      <input
        type="text"
        labelt="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">create</button>
    </form>
  )
}
export default CreateBlog
