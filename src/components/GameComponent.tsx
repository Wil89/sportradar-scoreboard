import React, { useState, useRef } from "react";
import { Game, Score } from "./ScoreBoard";

type Props = {
  game: Game;
  finishCallback: (game: Game) => void;
  updateCallBack: (game: Game, score: Score) => void;
};

export const GameComponent = (props: Props): JSX.Element => {
  const { game, finishCallback, updateCallBack } = props;
  const [homeScore, setHomeScore] = useState<number>(game.score.homeTeamScore);
  const [awayScore, setAwayScore] = useState<number>(game.score.awayTeamScore);

  const finish = () => {
    finishCallback(game);
  };

  const updateHomeScore = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.target !== null)
      setHomeScore(parseInt(event.currentTarget.value));
  };

  const updateAwayScore = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.target !== null)
      setAwayScore(parseInt(event.currentTarget.value));
  };

  const update = () => {
    const updatedScore: Score = {
      ...game.score,
      homeTeamScore: homeScore,
      awayTeamScore: awayScore,
      global: homeScore + awayScore,
    };
    updateCallBack(game, updatedScore);
  };

  return (
    <li>
      <div>
        <span>{game.score.homeTeamName} </span>
        <input
          value={homeScore}
          type="number"
          name="homeTeamScore"
          id="homeTeamScore"
          min={game.score.homeTeamScore}
          onChange={updateHomeScore}
          data-testid="home-score"
        />
        {" - "}
        <input
          value={awayScore}
          type="number"
          name="awayTeamScore"
          id="awayTeamScore"
          min={game.score.awayTeamScore}
          onChange={updateAwayScore}
          data-testid="away-score"
        />
        <span> {game.score.awayTeamName}</span>
        <button onClick={update}>Update</button>
        <button onClick={finish}>Finish</button>
      </div>
    </li>
  );
};
