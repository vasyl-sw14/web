import React, { useState } from "react";
import Header from "../Header/Header";
import "../../styles/Base.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const registrationHandler = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);

    fetch("http://127.0.0.1:8080/api/v1/register", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="content">
        <p className="headline">Welcome</p>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="First and Last name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm password"
        />
        <button className="button" onClick={() => registrationHandler()}>
          Sign up
        </button>
        <div id="error_message">{errorMessage}</div>
        <a href="#" onClick={() => navigate("/login")}>
          Already have an account? Sign in
        </a>
      </div>
    </>
  );
};

export default Register;
