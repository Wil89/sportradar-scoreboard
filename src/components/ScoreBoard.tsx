import React, { useState } from "react";
import { GameComponent } from "./GameComponent";
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

export interface Game {
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

  const finishGame = (gameFinished: Game) => {
    // update the game without remove it for been used later in
    // in summary
    setGames((curr) =>
      curr
        .filter((game) => game.id !== gameFinished.id)
        .concat({ ...gameFinished, status: GameStatus.Finished })
    );
  };

  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <ScoreForm startGameCallback={startGame} />
      <div>
        <h2>Matches</h2>
        <ul>
          {games?.map(
            (game) =>
              game.status !== GameStatus.Finished && (
                <GameComponent
                  key={game.id}
                  game={game}
                  finishCallback={finishGame}
                />
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ScoreBoard;
