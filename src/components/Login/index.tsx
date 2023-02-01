import React from "react";
import { API_URL } from "@constants/index";

const Login = () => {
  const handleLogin = (params: { username: string; password: string }) => {
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => {
      if (res.ok) {
        console.log("success");
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    handleLogin({ username, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username"></label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password" id="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
