import React, { useRef, useState } from "react";

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
  const homeNameRef = useRef<HTMLInputElement>(null);
  const awayNameRef = useRef<HTMLInputElement>(null);
  const homeScoreRef = useRef<HTMLInputElement>(null);
  const awayScoreRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    const score: Score = {
        homeTeamName: homeNameRef.current?.value || 'Home Team',
        homeTeamScore: 0 ,
        awayTeamName: awayNameRef.current?.value || 'Away Team',
        awayTeamScore: 0
    };

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
      <button onClick={startGame}>Start Game</button>
      <button>Finish Game</button>
      <button>Update Score</button>
      <button>Get Summary</button>
      <div>
        <div>
          <label htmlFor="homeName">Home Name</label>
          <input type="text" name="homeName" id="homeName" ref={homeNameRef} />
          <label htmlFor="homeScore">Home Score</label>
          <input
            type="number"
            name="homeScore"
            id="homeScore"
            min={0}
            ref={homeScoreRef}
          />
          <span> - </span>
          <label htmlFor="awayName">Away Name</label>
          <input type="text" name="awayName" id="awayName" ref={awayNameRef} />
          <label htmlFor="awayScore">Away Score</label>
          <input
            type="number"
            name="awayScore"
            id="awayScore"
            min={0}
            ref={awayScoreRef}
          />
        </div>
      </div>

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
