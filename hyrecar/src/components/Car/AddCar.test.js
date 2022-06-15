import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddCar from "./AddCar";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("AddCar", () => {
  it("Test cases", () => {
    render(
      <Router>
        <AddCar />
      </Router>
    );

    expect(screen.getByText("Add new car")).toBeInTheDocument();

    const make = screen.getByPlaceholderText("Make");
    const model = screen.getByPlaceholderText("Model");
    const year = screen.getByPlaceholderText("Year");

    act(() => {
      fireEvent.change(make, { target: { value: "BMW" } });
      fireEvent.change(model, { target: { value: "X6" } });
      fireEvent.change(year, { target: { value: 2021 } });
    });

    const button = screen.getByText("Add car");

    fireEvent.click(button);
  });
});
