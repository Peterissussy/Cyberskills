export interface RobotStats {
  strength: number;
  speed: number;
  durability: number;
}

export type GamePhase =
  | 'settings'
  | 'p1decl'
  | 'p2decl'
  | 'showdecl'
  | 'p1build'
  | 'p2build'
  | 'result'
  | 'matchResult';

export type ActiveTab = 'game' | 'rules';

export interface RoundLog {
  roundIndex: number;
  declaration: {
    player1: RobotStats;
    player2: RobotStats;
  };
  build: {
    player1: RobotStats;
    player2: RobotStats;
  };
  scores: {
    player1: number;
    player2: number;
  };
  roundWinner: 'player1' | 'player2' | 'draw';
}

export interface MatchScores {
  p1: number;
  p2: number;
}
