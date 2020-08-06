import React from "react";
const Login = ({
  setUsername,
  username,
  setPassword,
  password,
  handleLogin
}) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>
    username
    <input
      type="text"
      label="username"
      value={username}
      onChange={event => setUsername(event.target.value)}
    />
    <br />
    password
    <input
      type="password"
      label="password"
      value={password}
      onChange={({ target }) => setPassword(target.value)}
    />
    <br />
    <button type="submit">login</button>
  </form>
);

export default Login;
