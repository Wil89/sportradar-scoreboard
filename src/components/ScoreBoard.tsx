import React, { useState } from "react";

enum GameStatus {
  Started,
  Finished,
}

interface Score {
  homeTeamName: string;
  homeTeamScore: number;
  awayTeamName: string;
  awayTeamScore: number;
}
interface Game {
  id: string;
  status: GameStatus;
  score: Score;
  finishGame?: () => void;
  updateGame?: (scoreHome: number, scoreAway: number) => void;
}

const ScoreBoard = () => {
  const [games, setGames] = useState<Game[]>([]);

  const startGame = (score: Score) => {
    const game: Game = {
      status: GameStatus.Started,
      id: new Date().getMilliseconds.toString(),
      score: score,
    };
    setGames((curr) => curr.concat(game));
  };

  return (
    <div>
      <h1>Football World Cup Score Board</h1>
      <button
        onClick={() =>
          startGame({
            awayTeamName: "Brasil",
            awayTeamScore: 2,
            homeTeamName: "Spain",
            homeTeamScore: 1,
          })
        }
      >
        Start Game
      </button>
      <button>Finish Game</button>
      <button>Update Score</button>
      <button>Get Summary</button>

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
