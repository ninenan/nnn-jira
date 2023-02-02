import React from "react";
import { useAuth } from "@/context/module/authContext";

const Login = () => {
  const { user, login } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    login({ username, password });
  };

  return (
    <div>
      {user && user?.name}
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
