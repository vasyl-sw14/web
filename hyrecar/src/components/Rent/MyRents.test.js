import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyRents from "./MyRents";
import { act } from "react-dom/test-utils";

require("jest-fetch-mock").enableMocks();

describe("MyRents", () => {
  it("Test cases", () => {
    render(
      <Router>
        <MyRents />
      </Router>
    );

    expect(screen.getByText("My rentals")).toBeInTheDocument();
  });
});
