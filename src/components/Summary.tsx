import React from "react";
import { Game } from "./ScoreBoard";

type Props = {
  summary: Game[];
};

export const Summary = ({ summary }: Props) => {
  return (
    <div>
      <h1>Summary</h1>
      <ul>
        {summary.map((sum) => (
          <li key={sum.id}>
            <span>
              {sum.score.homeTeamName} {sum.score.homeTeamScore} -{" "}
              {sum.score.awayTeamScore} {sum.score.awayTeamName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
