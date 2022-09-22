import React, { useRef } from "react";
import { Game, ScoreName } from "./ScoreBoard";

type Props = {
  startGameCallback: (score: ScoreName) => void;
  getSummaryCallback: () => void;
};

export const ScoreForm = ({ startGameCallback, getSummaryCallback }: Props): JSX.Element => {
  const homeNameRef = useRef<HTMLInputElement>(null);
  const awayNameRef = useRef<HTMLInputElement>(null);

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
        <button onClick={getSummaryCallback}>Get Summary</button>
      </div>
      <div>
        <label htmlFor="homeName">Home Name</label>
        <input
          type="text"
          name="homeName"
          id="homeName"
          ref={homeNameRef}
          data-testid="home-name"
        />
        <label htmlFor="awayName">Away Name</label>
        <input
          type="text"
          name="awayName"
          id="awayName"
          ref={awayNameRef}
          data-testid="away-name"
        />
      </div>
    </div>
  );
};
