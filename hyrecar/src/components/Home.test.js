import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("Home", () => {
  let storage = { token: "$token" };

  let cars = [{ id: 1, make: "BMW", model: "X6", year: "2021", owner: "user" }];

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
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText("Cars list")).toBeInTheDocument();
  });

  it("useEffect call", async () => {
    await act(async () => {
      await fetchMock.mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(cars) })
      );
      render(
        <Router>
          <Home />
        </Router>
      );
    });

    expect(fetchMock).toHaveBeenCalledWith("http://127.0.0.1:8080/api/v1/cars");
  });

  it("Navigation", () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    const cars = screen.getByText("My cars");
    const rents = screen.getByText("My rentals");
    const add = screen.getByText("Add car");
    const profile = screen.getByText("Profile");

    act(() => {
      fireEvent.click(cars);
      fireEvent.click(rents);
      fireEvent.click(add);
      fireEvent.click(profile);
    });
  });
});
