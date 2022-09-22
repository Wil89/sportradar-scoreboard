import React, { useState, useRef } from "react";
import { Game, Score, StyledProps } from "../models/models";
import styled from "styled-components";
import { TeamName } from "./Summary";

interface Props extends StyledProps {
  game: Game;
  finishCallback: (game: Game) => void;
  updateCallBack: (game: Game, score: Score) => void;
}

const BasicGameComponent = (props: Props): JSX.Element => {
  const { game, finishCallback, updateCallBack, className } = props;
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
    <li className={className}>
      <div>
        <div>
          <TeamName alignRight>{game.score.homeTeamName} </TeamName>
          <input
            value={homeScore}
            type="number"
            name="homeTeamScore"
            id="homeTeamScore"
            min={game.score.homeTeamScore}
            onChange={updateHomeScore}
            data-testid="home-score"
          />
        </div>
        <div>
          <input
            value={awayScore}
            type="number"
            name="awayTeamScore"
            id="awayTeamScore"
            min={game.score.awayTeamScore}
            onChange={updateAwayScore}
            data-testid="away-score"
          />
          <TeamName> {game.score.awayTeamName}</TeamName>
        </div>
      </div>
      <div>
        <button onClick={update}>Update</button>
        <button onClick={finish}>Finish</button>
      </div>
    </li>
  );
};

export const GameComponent = styled(BasicGameComponent)`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  padding: 1rem 0;

  >div: first-of-type {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        display: flex;
        align-items: center;
    }

  }

  input {
    width: 20px;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    margin: 0 4px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input:focus-visible {
    outline: unset;
  }

  >div: last-of-type {
    position: absolute;
    right: 0;
  }

  span {
    font-size: 1rem;
    color: #ffffff;
    width: 100px;
    display: inline-block;
  }

  button {
    border-radius: 4px;
    border: none;
    padding: 4px;
  }
  button: first-of-type {
    margin-right: 4px;
  }
`;
