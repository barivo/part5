import React from "react";

const CreateBlog = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleCreate
}) => (
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
);

export default CreateBlog;
