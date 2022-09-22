import React, { useState } from "react";
import { GameComponent } from "./GameComponent";
import { ScoreForm } from "./ScoreForm";
import { Summary } from "./Summary";
import {
  Game,
  GameStatus,
  ScoreName,
  ScoreValue,
  Score,
  StyledProps,
} from "../models/models";
import styled from "styled-components";
import GameList from "./GameList";

const BasicScoreBoard = ({ className }: StyledProps): JSX.Element => {
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
    // safaty check avoid reducing score (NO VAR ALLOWED :D )
    if (
      game.score.homeTeamScore > score.homeTeamScore ||
      game.score.awayTeamScore > score.awayTeamScore
    ) {
      return;
    }
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
    <div className={className}>
      <h1>Football World Cup Score Board</h1>
      <ScoreForm
        startGameCallback={startGame}
        getSummaryCallback={getSummary}
      />
      {games.length > 0 ? (
        <GameList
          games={games}
          finishCallback={finishGame}
          updateCallBack={updateGame}
        />
      ) : (
        <p>No games today</p>
      )}
      {summary.length > 0 && <Summary summary={summary} />}
    </div>
  );
};

const ScoreBoard = styled(BasicScoreBoard)`
  max-width: 500px;
  min-width: 300px;
  width: auto;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 8px;
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.72);
  > h1 {
    text-align: center;
    margin: 0;
    font-size: 2rem;
    color: #ffffff;
  }

  p {
    font-size: 1rem;
    color: #ffffff;
    text-align: center;
  }
`;

export default ScoreBoard;
