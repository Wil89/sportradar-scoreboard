import React from "react";
import { Game } from "./ScoreBoard";

type Props = {
  game: Game;
  finishCallback: (game: Game) => void
};

export const GameComponent = ({ game, finishCallback }: Props) => {

    const finish = () => {
        finishCallback(game);
    }

  return (
    <li>
      <div>
        <span>
          {game.score.homeTeamName} {game.score.homeTeamScore} -{" "}
          {game.score.awayTeamScore} {game.score.awayTeamName}
        </span>
        <button>Update</button>
        <button onClick={finish}>Finish</button>
      </div>
    </li>
  );
};
