import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import ScoreBoard from "./components/ScoreBoard";
import userEvent from "@testing-library/user-event";

describe("test scoreboard", () => {
  test("renders the score board presence in App", () => {
    render(<App />);
    expect(
      screen.getByText(/Football World Cup Score Board/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Home Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Away Team/i)).toBeInTheDocument();
  });

  test("scoreboard initial empty state", () => {
    render(<ScoreBoard />);
    expect(screen.getByText(/No games today/i)).toBeInTheDocument();
    expect(screen.queryByText(/Matches/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(0);
  });

  test("click in Start Game should create an item list", async () => {
    render(<ScoreBoard />);
    await userEvent.type(screen.getByTestId("home-name"), "Spain");
    await userEvent.type(screen.getByTestId("away-name"), "England");
    fireEvent.click(screen.getByText(/Start Game/i));
    expect(screen.getByText(/Matches/i)).toBeInTheDocument();
    expect(screen.queryByText(/No games today/i)).not.toBeInTheDocument();
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(1);
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
    expect(screen.getByText(/England/i)).toBeInTheDocument();
    expect(screen.getByTestId("home-score")).toHaveValue(0);
    expect(screen.getByTestId("away-score")).toHaveValue(0);
    expect(screen.getAllByText(/Finish/i)).toHaveLength(1);
    expect(screen.getAllByText(/Update/i)).toHaveLength(1);
  });

  test("finish the game remove the game from DOM", async () => {
    render(<ScoreBoard />);
    await userEvent.type(screen.getByTestId("home-name"), "Spain");
    await userEvent.type(screen.getByTestId("away-name"), "England");
    fireEvent.click(screen.getByText(/Start Game/i));
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(1);
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
    expect(screen.getByText(/England/i)).toBeInTheDocument();
    expect(screen.getByTestId("home-score")).toHaveValue(0);
    expect(screen.getByTestId("away-score")).toHaveValue(0);
    expect(screen.getAllByText(/Finish/i)).toHaveLength(1);
    expect(screen.getAllByText(/Update/i)).toHaveLength(1);
    // Finish a game
    fireEvent.click(screen.getByText(/Finish/i));
    expect(screen.queryByText(/Spain/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/England/i)).not.toBeInTheDocument();
  });

  test("update game", async () => {
    render(<ScoreBoard />);
    await userEvent.type(screen.getByTestId("home-name"), "Spain");
    await userEvent.type(screen.getByTestId("away-name"), "England");
    fireEvent.click(screen.getByText(/Start Game/i));
    const items = screen.queryAllByRole("listitem");
    expect(items).toHaveLength(1);
    expect(screen.getByText(/Spain/i)).toBeInTheDocument();
    expect(screen.getByText(/England/i)).toBeInTheDocument();
    expect(screen.getByTestId("home-score")).toHaveValue(0);
    expect(screen.getByTestId("away-score")).toHaveValue(0);
    expect(screen.getAllByText(/Finish/i)).toHaveLength(1);
    expect(screen.getAllByText(/Update/i)).toHaveLength(1);
    //Update a game
    await userEvent.type(screen.getByTestId("home-score"), "0");
    await userEvent.type(screen.getByTestId("away-score"), "1");
    fireEvent.click(screen.getByText(/Update/i));
    expect(screen.getByTestId("home-score")).toHaveValue(0);
    expect(screen.getByTestId("away-score")).toHaveValue(1);
  });
});
