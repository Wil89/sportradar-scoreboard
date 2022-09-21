import React, { useRef, useState } from "react";
import { ScoreForm } from "./ScoreForm";

enum GameStatus {
  Started,
  Finished,
}

export interface ScoreName {
  homeTeamName: string;
  awayTeamName: string;
}

export interface ScoreValue {
  homeTeamScore: number;
  awayTeamScore: number;
}

export type Score = ScoreName & ScoreValue;

interface Game {
  id: string;
  status: GameStatus;
  score: Score;
}

interface ScoreBoard {
  games: Game[];
  startGame: () => void;
  finishGame: () => void;
  updateGame: (score: Score) => void;
  getSummary: () => Game[];
}

const ScoreBoard = () => {
  const [games, setGames] = useState<Game[]>([]);

  const startGame = (scoreName: ScoreName) => {
    const game: Game = {
      status: GameStatus.Started,
      id: new Date().getMilliseconds.toString(),
      score: { ...scoreName, homeTeamScore: 0, awayTeamScore: 0 },
    };
    setGames((curr) => curr.concat(game));
  };

  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <ScoreForm startGameCallback={startGame} />
      <div>
        <h2>Matches</h2>
        <ul>
          {/* TODO later will be replaced for a component */}
          {games?.map((game) => (
            // TODO replaced later for a Game component
            <li key={game.id}>
              <span>
                {game.score.homeTeamName} {game.score.homeTeamScore} -{" "}
                {game.score.awayTeamScore} {game.score.awayTeamName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScoreBoard;
