import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService({ username, password });
      console.log(user);

      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedIn", JSON.stringify(user));
    } catch (exception) {
      console.log("Login error: ", exception);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedIn");
  };

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={() => handleLogOut()}>logout</button>
      <br />
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
    if (loggedUserJSON) {
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
      {user !== null && blogsList()}
      <h3>mluukkai</h3>
    </div>
  );
};

export default App;
