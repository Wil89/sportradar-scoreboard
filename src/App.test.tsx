import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import ScoreBoard from "./components/ScoreBoard";

describe("test scoreboard", () => {
  test("renders the score board presence in App", () => {
    render(<App />);
    expect(
      screen.getByText(/Football World Cup Score Board/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Finish Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Matches/i)).toBeInTheDocument();
  });

  test("scoreboard initial empty state", () => {
    render(<ScoreBoard />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
});
