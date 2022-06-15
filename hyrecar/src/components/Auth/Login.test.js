import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

require("jest-fetch-mock").enableMocks();

describe("Login", () => {
  it("Initial render", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Login call test", () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: "$token" }));

    render(
      <Router>
        <Login />
      </Router>
    );

    const button = screen.getByText("Log in");
    fireEvent.click(button);

    const formData = new FormData();
    formData.append("email", "");
    formData.append("password", "");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8080/api/v1/login",
      {
        method: "POST",
        body: formData,
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const registerLink = screen.getByText("Don't have an account? Sign up");

    fireEvent.click(registerLink);
  });
});
