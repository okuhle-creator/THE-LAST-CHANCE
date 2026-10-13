export type GameMode = 'classic' | 'blitz' | 'custom';

export type CaseDepartment = 
  | 'Homicide & Clues'
  | 'The Syndicate'
  | 'Cold Cases'
  | 'Forensic Science'
  | 'Court & Law'
  | 'Classic Archive';

export interface CaseFile {
  id: string;
  caseNumber: string;
  word: string;
  title: string;
  department: CaseDepartment;
  difficulty: 'Novice' | 'Inspector' | 'Mastermind';
  briefing: string;
  forensicHint: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface PlayerStats {
  casesAttempted: number;
  casesSolved: number;
  currentStreak: number;
  bestStreak: number;
  perfectCases: number;
  blitzVictories: number;
}
