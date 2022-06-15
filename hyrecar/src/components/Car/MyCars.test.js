import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyCars from "./MyCars";

describe("MyCars", () => {
  let storage = { token: "$token" };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          cars: [{ id: 1, make: "Test", model: "Test", year: 2021 }],
        }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

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

  it("Test cases", () => {
    // fetchMock.mockResponse({
    //   cars: [{ id: 1, make: "Test", model: "Test", year: 2021 }],
    // });

    render(
      <Router>
        <MyCars />
      </Router>
    );

    const headers = new Headers();
    headers.set("Authorization", "Bearer $token");

    expect(fetch).toHaveBeenCalledWith("http://127.0.0.1:8080/api/v1/myCars", {
      headers,
    });

    expect(screen.getByText("My cars")).toBeInTheDocument();
  });
});
