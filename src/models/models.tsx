export enum GameStatus {
  Started,
  Finished,
}

export interface ScoreName {
  homeTeamName: string;
  awayTeamName: string;
}

export interface ScoreValue {
  homeTeamScore: number;
  awayTeamScore: number;
  global: number;
}

export type Score = ScoreName & ScoreValue;

export interface Game {
  id: string;
  status: GameStatus;
  score: Score;
}

export interface StyledProps {
    className?: string;
}
