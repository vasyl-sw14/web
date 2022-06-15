import React, { useState } from "react";
import "../../styles/Base.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const loginHandler = () => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://127.0.0.1:8080/api/v1/login", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then((json) => {
        window.localStorage.setItem("token", json.token);
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="content">
        <p className="headline">Login</p>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={() => loginHandler()}>
          Log in
        </button>
        <div id="error_message">{errorMessage}</div>
        <a href="#" onClick={() => navigate("/register")}>
          Don't have an account? Sign up
        </a>
      </div>
    </>
  );
};

export default Login;
