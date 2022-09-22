import React from "react";
import { Game, StyledProps } from "../models/models";
import styled from "styled-components";
interface Props extends StyledProps {
  summary: Game[];
}

type TeamNameProps = {
  alignRight?: boolean;
};

const BaseSpan = styled.span`
  color: #ffffff;
  font-size: 1rem;
`;

export const TeamName = styled(BaseSpan)`
  width: 100px;
  white-space: nowrap; 
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${(props: TeamNameProps) =>
    props.alignRight ? "right" : "left"};
  display: inline-block;
`;

const TeamScore = styled(BaseSpan)`
  margin: 0 4px;
  font-weight: bold;
`;

const BasicSummary = ({ summary, className }: Props) => {
  return (
    <div className={className}>
      <h2>Summary</h2>
      <ul>
        {summary.map((sum) => (
          <li key={sum.id}>
            <div>
              <TeamName alignRight>{sum.score.homeTeamName}</TeamName>
              <TeamScore>{sum.score.homeTeamScore}</TeamScore>
            </div>
            <span> - </span>
            <div>
              <TeamScore>{sum.score.awayTeamScore}</TeamScore>
              <TeamName>{sum.score.awayTeamName}</TeamName>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Summary = styled(BasicSummary)`
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

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    > div {
      display: flex;
      align-items: center;
    }
  }

  span {
    color: #ffffff;
  }
`;
