import React, { FormEvent, useRef } from "react";
import { ScoreName, StyledProps } from "../models/models";
import styled from "styled-components";

interface Props extends StyledProps {
  startGameCallback: (score: ScoreName) => void;
  getSummaryCallback: () => void;
}

const BasicScoreForm = ({
  startGameCallback,
  getSummaryCallback,
  className,
}: Props): JSX.Element => {
  const homeNameRef = useRef<HTMLInputElement>(null);
  const awayNameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const startGame = (e: FormEvent) => {
    e.preventDefault();
    const scoreName: ScoreName = {
      homeTeamName: homeNameRef.current?.value || "Home Team",
      awayTeamName: awayNameRef.current?.value || "Away Team",
    };
    formRef.current?.reset();
    startGameCallback(scoreName);
  };

  const summary = (e: FormEvent) => {
    e.preventDefault();
    getSummaryCallback();
  };

  return (
    <form ref={formRef} className={className}>
      <div>
        <div>
          <label htmlFor="homeName">Home Team</label>
          <input
            type="text"
            name="homeName"
            id="homeName"
            maxLength={20}
            ref={homeNameRef}
            data-testid="home-name"
          />
        </div>
        <div>
          <label htmlFor="awayName">Away Team</label>
          <input
            type="text"
            maxLength={20}
            name="awayName"
            id="awayName"
            ref={awayNameRef}
            data-testid="away-name"
          />
        </div>
      </div>
      <div>
        <button onClick={startGame}>Start Game</button>
        <button onClick={summary}>Summary</button>
      </div>
    </form>
  );
};

export const ScoreForm = styled(BasicScoreForm)`
  > div:first-of-type {
    margin-top: 1rem;
    display: flex;
    justify-content: space-evenly;

    label {
      color: #ffffff;
      font-size: 1rem;
      font-weight: bold;
      display: block;
      text-align: center;
      margin-bottom: 4px;
    }

    input {
      height: 24px;
      box-sizing: border-box;
      border-radius: 4px;
      border: none;
      max-width: 120px;
      padding: 4px;
    }

    input:focus-visible {
      outline: unset;
    }
  }

  > div:last-of-type {
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid #ffffff;
    border-radius: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items; center;

    button {
      background-color: #ffffff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 1rem;
      cursor: pointer;
    }
  }

`;
