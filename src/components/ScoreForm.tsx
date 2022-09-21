import React, { useRef } from "react";
import { ScoreName } from "./ScoreBoard";


type Props = {
  startGameCallback: (score: ScoreName) => void;
};

export const ScoreForm = ({ startGameCallback }: Props) => {
  const homeNameRef = useRef<HTMLInputElement>(null);
  const awayNameRef = useRef<HTMLInputElement>(null);
  const homeScoreRef = useRef<HTMLInputElement>(null);
  const awayScoreRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    const scoreName: ScoreName = {
      homeTeamName: homeNameRef.current?.value || "Home Team",
      awayTeamName: awayNameRef.current?.value || "Away Team",
    };
    startGameCallback(scoreName);
  };

  return (
    <div>
      <div>
        <button onClick={startGame}>Start Game</button>
        <button>Finish Game</button>
        <button>Update Score</button>
        <button>Get Summary</button>
      </div>
      <div>
        <label htmlFor="homeName">Home Name</label>
        <input type="text" name="homeName" id="homeName" ref={homeNameRef} data-testid="home-name" />
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
        <input type="text" name="awayName" id="awayName" ref={awayNameRef} data-testid="away-name"/>
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
  );
};
