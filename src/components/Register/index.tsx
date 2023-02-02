import React from "react";
import useAuth from "@hooks/useAuth";

const Login = () => {
  const { register } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    register({ username, password });
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
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Login;
