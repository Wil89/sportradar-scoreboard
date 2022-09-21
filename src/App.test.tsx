import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the score board presence", () => {
  render(<App />);
  expect(
    screen.getByText(/Football World Cup Score Board/i)
  ).toBeInTheDocument();
});
