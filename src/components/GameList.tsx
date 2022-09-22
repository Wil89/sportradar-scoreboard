import React from "react";
import { Score, StyledProps } from "../models/models";
import { Game } from "../models/models";
import { GameComponent } from "./GameComponent";
import styled from "styled-components";

interface Props extends StyledProps {
  games: Game[];
  finishCallback: (game: Game) => void;
  updateCallBack: (game: Game, score: Score) => void;
}

const BasicGameList = (props: Props) => {
  const { games, className, finishCallback, updateCallBack } = props;
  return (
    <div className={className}>
      <h2>Matches</h2>
      <ul>
        {games?.map((game) => (
          <GameComponent
            key={game.id}
            game={game}
            finishCallback={finishCallback}
            updateCallBack={updateCallBack}
          />
        ))}
      </ul>
    </div>
  );
};

const GameList = styled(BasicGameList)`
  h2 {
    font-size: 1.5rem;
    color: #ffffff;
    text-align: center;
    margin: 1rem 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

export default GameList;
