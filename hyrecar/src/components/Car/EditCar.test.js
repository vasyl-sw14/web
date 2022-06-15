import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditCar from "./EditCar";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("EditCar", () => {
  let storage = { token: "$token" };

  let car = { id: 1, make: "BMW", model: "X6", year: "2021", owner: "user" };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(car),
    })
  );

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
    render(
      <Router>
        <EditCar />
      </Router>
    );

    expect(screen.getByText("Edit car")).toBeInTheDocument();

    const make = screen.getByPlaceholderText("Make");
    const model = screen.getByPlaceholderText("Model");
    const year = screen.getByPlaceholderText("Year");

    act(() => {
      fireEvent.change(make, { target: { value: "BMW" } });
      fireEvent.change(model, { target: { value: "X6" } });
      fireEvent.change(year, { target: { value: 2021 } });
    });

    const button = screen.getByText("Edit");

    fireEvent.click(button);
  });
});
