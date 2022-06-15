import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "./Register";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("Register", () => {
  it("Initial render", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("Register call test", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fetchMock.mockResponseOnce(200);

    const loginLink = screen.getByText("Already have an account? Sign in");

    const button = screen.getByText("Sign up");

    act(() => {
      fireEvent.click(button);
      fireEvent.click(loginLink);
    });

    const formData = new FormData();
    formData.append("fullName", "");
    formData.append("email", "");
    formData.append("password", "");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8080/api/v1/register",
      {
        method: "POST",
        body: formData,
      }
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("Change inputs", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const fullName = screen.getByPlaceholderText("First and Last name");
    const email = screen.getByPlaceholderText("Email");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    const password = screen.getByPlaceholderText("Password");

    act(() => {
      fireEvent.change(fullName, { target: { value: "Test" } });
      fireEvent.change(email, { target: { value: "email" } });
      fireEvent.change(confirmPassword, { target: { value: "password123" } });
      fireEvent.change(password, { target: { value: "password" } });
    });

    expect(fullName.value).toBe("Test");
    expect(email.value).toBe("email");
    expect(confirmPassword.value).toBe("password123");
    expect(password.value).toBe("password");
  });
});
