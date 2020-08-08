import React from "react";
const Login = ({
  setUsername,
  username,
  setPassword,
  password,
  handleSubmit
}) => (
  <div>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default Login;
