import React, { useState } from "react";

enum GameStatus {
  Started,
  Finished,
}
interface Game {
  id: string;
  status: GameStatus;
  homeTeam: string;
  awayTeam: string;
  scoreHome: number;
  scoreAway: number;
  finishGame: () => void;
  updateGame: (scoreHome: number, scoreAway: number) => void;
}

const ScoreBoard = () => {
  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <button>Start Game</button>
      <button>Finish Game</button>
      <button>Update Score</button>
      <button>Get Summary</button>

      <div>
        <h2>Matches</h2>
        <ul></ul>
      </div>
    </div>
  );
};

export default ScoreBoard;
