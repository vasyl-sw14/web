import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("Profile", () => {
  let storage = { token: "$token" };

  let profileData = { id: 1, fullName: "Test", email: "test" };

  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      storage[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => storage[key]);
  });

  afterAll(() => {
    global.Storage.prototype.setItem.mockReset();
    global.Storage.prototype.getItem.mockReset();
  });

  it("Initial render", () => {
    fetchMock.mockResponse(JSON.stringify(profileData));

    act(() => {
      render(
        <Router>
          <Profile />
        </Router>
      );
    });

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("Button events", () => {
    fetchMock.mockResponse("Updated");

    render(
      <Router>
        <Profile />
      </Router>
    );

    const headers = new Headers();
    headers.set("Authorization", "Bearer $token");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8080/api/v1/user",
      {
        method: "GET",
        headers,
      }
    );

    const logout = screen.getByText("Log out");
    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8080/api/v1/user",
      {
        method: "DELETE",
        headers,
      }
    );

    fireEvent.click(logout);

    const fullName = screen.getByPlaceholderText("First and Last name");
    const email = screen.getByPlaceholderText("Email");

    act(() => {
      fireEvent.change(fullName, { target: { value: "Test" } });
      fireEvent.change(email, { target: { value: "email" } });
    });

    expect(fullName.value).toBe("Test");
    expect(email.value).toBe("email");
  });

  it("Update", () => {
    fetchMock.mockResponse("Updated");

    render(
      <Router>
        <Profile />
      </Router>
    );

    const headers = new Headers();
    headers.set("Authorization", "Bearer $token");

    const formData = new FormData();
    formData.append("email", "");
    formData.append("fullName", "");

    const save = screen.getByText("Save");

    fireEvent.click(save);
  });
});
