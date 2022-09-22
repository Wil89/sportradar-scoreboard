import React, { useState } from "react";
import { GameComponent } from "./GameComponent";
import { ScoreForm } from "./ScoreForm";
import { Summary } from "./Summary";

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
  global: number;
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

const ScoreBoard = (): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);
  const [summary, setSummary] = useState<Game[]>([]);

  const startGame = (scoreName: ScoreName) => {
    //check if any of the selected teams are already playing
    if (
      games.some(
        (game) =>
          game.score.awayTeamName === scoreName.homeTeamName ||
          game.score.homeTeamName === scoreName.homeTeamName ||
          game.score.awayTeamName === scoreName.awayTeamName ||
          game.score.homeTeamName === scoreName.awayTeamName
      )
    ) {
      return;
    }
    const game: Game = {
      status: GameStatus.Started,
      id: new Date().getMilliseconds().toString(),
      score: { ...scoreName, homeTeamScore: 0, awayTeamScore: 0, global: 0 },
    };
    setGames((currState) => currState.concat(game));
  };

  const finishGame = (gameFinished: Game) => {
    setGames((currState) =>
      currState.filter((game) => game.id !== gameFinished.id)
    );
  };

  const updateGame = (game: Game, score: Score) => {
    const idx = games.indexOf(game);
    const updatedGame: Game = {
      ...game,
      score: score,
    };
    const gamesCopy = [...games];
    gamesCopy[idx] = updatedGame;
    setGames(gamesCopy);
  };

  const getSummary = () => {
    // buble sort
    let result = [...games];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j].score.global > result[j + 1].score.global) {
          let temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
        }
      }
    }
    setSummary(result.reverse());
  };

  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <ScoreForm
        startGameCallback={startGame}
        getSummaryCallback={getSummary}
      />
      <div>
        <h2>Matches</h2>
        <ul>
          {games?.map((game) => (
            <GameComponent
              key={game.id}
              game={game}
              finishCallback={finishGame}
              updateCallBack={updateGame}
            />
          ))}
        </ul>
      </div>
      {summary.length > 0 && <Summary summary={summary} />}
    </div>
  );
};

export default ScoreBoard;
