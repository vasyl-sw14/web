import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from "./Header";

test("Header", () => {
  render(
    <Router>
      <Header />
    </Router>
  );

  const homeButton = screen.getByText("Hyrecar");

  fireEvent.click(homeButton);

  expect(homeButton).toBeInTheDocument();
});
