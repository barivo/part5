import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [alert, setAlert] = useState({ type: null, msg: "" });

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService({ username, password });

      setUser(user);
      setUsername("");
      setPassword("");
      if (user) {
        blogService.setToken(user.token);
      } else {
        sendNotification({ type: "error", msg: "wrong username or password" });
      }
      window.localStorage.setItem("loggedIn", JSON.stringify(user));
    } catch (exception) {
      console.log("Login error: ", exception);
    }
  };

  const sendNotification = ({ type, msg }) => {
    console.log(alert);
    setAlert({ type, msg });
    setTimeout(() => setAlert({ type: null, msg: null }), 5000);
  };

  const handleCreate = async event => {
    event.preventDefault();
    try {
      const blog = { title: title, author: author, url: url };
      const newBlog = await blogService.createBlog(blog);
      setTitle("");
      setAuthor("");
      setUrl("");
      if (newBlog) {
        setBlogs([...blogs, newBlog]);
        sendNotification({
          type: "success ",
          msg: `a new blog: ${newBlog.title} by ${user.name} was added`
        });
      }
    } catch (exception) {
      console.log("Blog creation error: ", exception);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedIn");
  };

  const notification = () => (
    <h2>
      {alert.kind} {alert.msg}
    </h2>
  );

  const blogHeader = () => (
    <>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={() => handleLogOut()}>logout</button>
      <br />
    </>
  );

  const blogsList = () => (
    <>
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedIn");
    if (loggedUserJSON && user) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {user === null && (
        <Login
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {alert.type !== null && notification()}
      {user === null ? null : (
        <>
          {blogHeader()}
          <CreateBlog
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            handleCreate={handleCreate}
          />

          {blogsList()}
        </>
      )}
      <h3>mluukkai</h3>
    </div>
  );
};

export default App;
