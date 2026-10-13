import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CASE_ARCHIVES } from './data/cases';
import { CaseFile, GameMode, GameStatus, PlayerStats } from './types';
import { SoundEngine } from './utils/audio';
import { GallowsBoard } from './components/GallowsBoard';
import { TypewriterKeyboard } from './components/TypewriterKeyboard';
import { CaseBriefingModal } from './components/CaseBriefingModal';
import { GameOverModal } from './components/GameOverModal';
import { DetectiveStatsModal } from './components/DetectiveStatsModal';
import { CustomCaseModal } from './components/CustomCaseModal';
import {
  Volume2,
  VolumeX,
  Trophy,
  PlusCircle,
  Clock,
  Sparkles,
  Shuffle,
  Shield,
  FileText
} from 'lucide-react';

const MAX_MISTAKES = 6;
const BLITZ_DURATION = 60; // 60 seconds

export const App: React.FC = () => {
  // Case selection
  const [caseIndex, setCaseIndex] = useState(0);
  const [currentCase, setCurrentCase] = useState<CaseFile>(CASE_ARCHIVES[0]);
  const [gameMode, setGameMode] = useState<GameMode>('classic');

  // Game gameplay state
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const [hintUsed, setHintUsed] = useState(false);
  const [chemicalUsed, setChemicalUsed] = useState(false);

  // Blitz mode timer
  const [timeLeft, setTimeLeft] = useState<number>(BLITZ_DURATION);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const blitzIntervalRef = useRef<number | null>(null);

  // Settings & Modals
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('last_chance_sound') !== 'false';
  });
  const [showBriefing, setShowBriefing] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  // Career stats
  const [stats, setStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem('last_chance_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback default
      }
    }
    return {
      casesAttempted: 0,
      casesSolved: 0,
      currentStreak: 0,
      bestStreak: 0,
      perfectCases: 0,
      blitzVictories: 0
    };
  });

  // Calculate mistakes
  const incorrectGuesses = guessedLetters.filter(
    (char) => !currentCase.word.includes(char)
  );
  const mistakes = incorrectGuesses.length;

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('last_chance_sound', String(soundEnabled));
  }, [soundEnabled]);

  // Persist stats
  useEffect(() => {
    localStorage.setItem('last_chance_stats', JSON.stringify(stats));
  }, [stats]);

  // Handle Blitz Timer
  useEffect(() => {
    if (gameMode === 'blitz' && timerActive && status === 'playing') {
      blitzIntervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(blitzIntervalRef.current!);
            handleGameOver(false);
            return 0;
          }
          if (prev <= 10) {
            SoundEngine.playTick(soundEnabled);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (blitzIntervalRef.current) clearInterval(blitzIntervalRef.current);
    };
  }, [gameMode, timerActive, status, soundEnabled]);

  // Initialize a new case
  const loadCase = useCallback((caseFile: CaseFile, mode: GameMode = 'classic') => {
    setCurrentCase(caseFile);
    setGuessedLetters([]);
    setStatus('playing');
    setHintUsed(false);
    setChemicalUsed(false);
    setShowGameOver(false);
    setGameMode(mode);

    if (mode === 'blitz') {
      setTimeLeft(BLITZ_DURATION);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }
  }, []);

  // Handle case conclusion
  const handleGameOver = useCallback((isVictory: boolean) => {
    setStatus(isVictory ? 'won' : 'lost');
    setTimerActive(false);

    if (isVictory) {
      SoundEngine.playStampSlam(soundEnabled);
      SoundEngine.playWinFanfare(soundEnabled);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#2D5A43', '#8C6D3F', '#8C1D24', '#FAF6EE']
      });
    } else {
      SoundEngine.playStampSlam(soundEnabled);
      SoundEngine.playFailChime(soundEnabled);
    }

    // Update stats
    setStats((prev) => {
      const isPerfect = isVictory && mistakes === 0;
      const newStreak = isVictory ? prev.currentStreak + 1 : 0;
      return {
        casesAttempted: prev.casesAttempted + 1,
        casesSolved: isVictory ? prev.casesSolved + 1 : prev.casesSolved,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        perfectCases: isPerfect ? prev.perfectCases + 1 : prev.perfectCases,
        blitzVictories: (isVictory && gameMode === 'blitz') ? prev.blitzVictories + 1 : prev.blitzVictories
      };
    });

    setTimeout(() => {
      setShowGameOver(true);
    }, 600);
  }, [mistakes, soundEnabled, gameMode]);

  // Check win condition
  const checkWinCondition = useCallback((updatedGuesses: string[]) => {
    const allGuessed = currentCase.word
      .split('')
      .every((char) => updatedGuesses.includes(char));

    if (allGuessed) {
      handleGameOver(true);
    }
  }, [currentCase.word, handleGameOver]);

  // Handle a letter deduction
  const handleGuess = useCallback((letter: string) => {
    if (status !== 'playing' || guessedLetters.includes(letter)) return;

    SoundEngine.playKeyClick(soundEnabled);

    const updatedGuesses = [...guessedLetters, letter];
    setGuessedLetters(updatedGuesses);

    const isCorrect = currentCase.word.includes(letter);
    if (isCorrect) {
      SoundEngine.playBellDing(soundEnabled);
      checkWinCondition(updatedGuesses);
    } else {
      SoundEngine.playStrikeThud(soundEnabled);
      if (mistakes + 1 >= MAX_MISTAKES) {
        handleGameOver(false);
      }
    }
  }, [status, guessedLetters, soundEnabled, currentCase.word, checkWinCondition, mistakes, handleGameOver]);

  // Forensic Chemical elimination lifeline (removes 2 unchosen incorrect letters)
  const handleChemicalTest = () => {
    if (chemicalUsed || status !== 'playing') return;
    SoundEngine.playKeyClick(soundEnabled);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const wrongUnpicked = alphabet.filter(
      (c) => !currentCase.word.includes(c) && !guessedLetters.includes(c)
    );

    if (wrongUnpicked.length >= 2) {
      const eliminated = wrongUnpicked.sort(() => 0.5 - Math.random()).slice(0, 2);
      setGuessedLetters((prev) => [...prev, ...eliminated]);
      setChemicalUsed(true);
    }
  };

  // Switch to next case
  const handleNextCase = () => {
    const nextIdx = (caseIndex + 1) % CASE_ARCHIVES.length;
    setCaseIndex(nextIdx);
    loadCase(CASE_ARCHIVES[nextIdx], gameMode === 'custom' ? 'classic' : gameMode);
  };

  // Random mystery case
  const handleRandomCase = () => {
    let randIdx = Math.floor(Math.random() * CASE_ARCHIVES.length);
    if (randIdx === caseIndex) {
      randIdx = (randIdx + 1) % CASE_ARCHIVES.length;
    }
    setCaseIndex(randIdx);
    loadCase(CASE_ARCHIVES[randIdx], gameMode === 'custom' ? 'classic' : gameMode);
  };

  // Custom case handler
  const handleStartCustomCase = (customFile: CaseFile) => {
    setShowCustomModal(false);
    loadCase(customFile, 'custom');
  };

  // Replay current case
  const handleReplay = () => {
    loadCase(currentCase, gameMode);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-3 sm:p-6 max-w-4xl mx-auto select-none">
      {/* Bureau Top Navigation Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-[#D8CFBC]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1F1B18] text-[#FAF6EE] flex items-center justify-center font-serif font-black text-lg shadow-sm border-2 border-[#8C6D3F]">
            LC
          </div>
          <div>
            <h1 className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[#1F1B18] leading-none flex items-center gap-2">
              THE LAST CHANCE
              <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-[#EFE6D6] text-[#665C54] px-2 py-0.5 rounded border border-[#DACFBD]">
                EST. 1948
              </span>
            </h1>
            <p className="text-[11px] font-mono uppercase tracking-widest text-[#7D5A3B] mt-0.5">
              Bureau of Criminal Investigation • Word Mystery
            </p>
          </div>
        </div>

        {/* Top Controls: Sound, Stats, Dossier, Custom */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Switcher Badge */}
          <div className="flex items-center bg-[#EAE0CD] p-0.5 rounded border border-[#C7BBA7] text-xs font-mono">
            <button
              onClick={() => loadCase(currentCase, 'classic')}
              className={`px-2 py-1 rounded transition-colors ${
                gameMode === 'classic'
                  ? 'bg-[#1F1B18] text-[#FAF6EE] font-bold shadow-xs'
                  : 'text-[#594E42] hover:text-[#1F1B18]'
              }`}
              title="Classic 6-Strike Investigation"
            >
              Classic
            </button>
            <button
              onClick={() => loadCase(currentCase, 'blitz')}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                gameMode === 'blitz'
                  ? 'bg-[#8C1D24] text-[#FAF6EE] font-bold shadow-xs'
                  : 'text-[#594E42] hover:text-[#1F1B18]'
              }`}
              title="60-Second Blitz Interrogation"
            >
              <Clock size={12} /> Blitz
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded bg-[#FAF6EE] border border-[#C7BBA7] text-[#594E42] hover:text-[#1F1B18] transition-colors shadow-xs"
            title={soundEnabled ? 'Mute mechanical typewriter audio' : 'Enable sound'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Career Record / Stats */}
          <button
            onClick={() => setShowStats(true)}
            className="p-2 rounded bg-[#FAF6EE] border border-[#C7BBA7] text-[#594E42] hover:text-[#1F1B18] transition-colors shadow-xs"
            title="Inspect Detective Career Record"
            aria-label="View stats"
          >
            <Trophy size={16} />
          </button>

          {/* Seal Custom Case */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#FAF6EE] border border-[#C7BBA7] text-xs font-mono font-bold text-[#594E42] hover:text-[#1F1B18] transition-colors shadow-xs"
            title="Create custom mystery word for a friend"
          >
            <PlusCircle size={14} /> Custom Case
          </button>
        </div>
      </header>

      {/* Main Dossier Card Area */}
      <main className="vintage-card bg-[#FAF6EE] border-2 border-[#C7BBA7] rounded-lg p-4 sm:p-7 relative overflow-hidden">
        {/* Manila Folder Tab Top Detail */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#D8CFBC]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#8C1D24] bg-[#F7EBEB] px-2 py-0.5 rounded border border-[#E9CFCF]">
              {currentCase.caseNumber}
            </span>
            <span className="font-mono text-xs text-[#594E42] uppercase tracking-wider">
              {currentCase.department}
            </span>
            <span className="hidden md:inline text-xs font-mono text-[#8C6D3F]">
              [{currentCase.difficulty.toUpperCase()}]
            </span>
          </div>

          {/* Quick Case Jump & Clue Trigger */}
          <div className="flex items-center gap-2">
            {/* Blitz Countdown Clock */}
            {gameMode === 'blitz' && (
              <div className={`flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded border ${
                timeLeft <= 10
                  ? 'bg-[#8C1D24] text-[#FAF6EE] border-[#5E1218] animate-pulse'
                  : 'bg-[#EAE0CD] text-[#594E42] border-[#C7BBA7]'
              }`}>
                <Clock size={13} /> {timeLeft}s
              </div>
            )}

            {/* Inspect Case Briefing / Hint */}
            <button
              onClick={() => setShowBriefing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAE0CD] hover:bg-[#DCD0BB] text-[#332D28] font-mono text-xs font-bold rounded border border-[#C7BBA7] transition-colors"
            >
              <FileText size={13} /> Dossier Notes
            </button>

            {/* Random Next Case */}
            <button
              onClick={handleRandomCase}
              className="p-1.5 rounded bg-[#FAF6EE] hover:bg-[#EFE8D8] border border-[#C7BBA7] text-[#594E42] hover:text-[#1F1B18] transition-colors"
              title="Next Random Case"
            >
              <Shuffle size={14} />
            </button>
          </div>
        </div>

        {/* Case Title Banner */}
        <div className="text-center mb-5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B18] tracking-tight">
            {currentCase.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#665C54] italic mt-1 max-w-xl mx-auto">
            "{currentCase.briefing}"
          </p>
        </div>

        {/* Interactive Layout: Gallows Board & Secret Cipher Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-3">
          {/* Left: SVG Gallows Visualizer */}
          <div className="md:col-span-5 flex justify-center">
            <GallowsBoard
              mistakes={mistakes}
              maxMistakes={MAX_MISTAKES}
              isWon={status === 'won'}
              isLost={status === 'lost'}
            />
          </div>

          {/* Right: Secret Cipher Word Letter Slots & Forensic Tools */}
          <div className="md:col-span-7 flex flex-col items-center justify-center space-y-6">
            {/* The Word Letter Slots */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4 px-2 bg-[#F5EFE6] border border-[#D8CFBC] rounded-lg shadow-inner">
              {currentCase.word.split('').map((char, index) => {
                const isGuessed = guessedLetters.includes(char);
                const reveal = isGuessed || status === 'lost';
                return (
                  <div
                    key={index}
                    className={`
                      w-9 h-12 sm:w-12 sm:h-16
                      flex items-center justify-center
                      font-mono text-2xl sm:text-3xl font-bold
                      border-b-4 transition-all duration-200
                      ${
                        reveal
                          ? isGuessed
                            ? 'text-[#1F1B18] border-[#2D5A43] bg-[#FAF6EE]'
                            : 'text-[#8C1D24] border-[#8C1D24] bg-[#FAECEC]'
                          : 'border-[#594E42] text-transparent bg-[#FAF8F2]'
                      }
                      rounded-t-sm shadow-xs
                    `}
                  >
                    {reveal ? char : ''}
                  </div>
                );
              })}
            </div>

            {/* Forensic Deductions Bar & Lifeline Button */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 px-2 text-xs font-mono text-[#665C54]">
              <div className="flex items-center gap-2">
                <span>Deductions Made: <strong>{guessedLetters.length}</strong></span>
                <span>•</span>
                <span>Remaining: <strong>{MAX_MISTAKES - mistakes}</strong></span>
              </div>

              {/* Chemical Elimination Lifeline */}
              <button
                type="button"
                disabled={chemicalUsed || status !== 'playing'}
                onClick={handleChemicalTest}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono font-bold transition-all ${
                  chemicalUsed
                    ? 'bg-[#E5DAC8] text-[#857767] border-[#C5B7A1] cursor-not-allowed line-through opacity-70'
                    : 'bg-[#FAF6EE] text-[#8C6D3F] border-[#C7BBA7] hover:bg-[#FAF1D6] hover:border-[#8C6D3F] shadow-xs'
                }`}
                title="Chemical elimination eliminates 2 non-matching letters from the typewriter"
              >
                <Sparkles size={12} />
                {chemicalUsed ? 'Chemical Test Spent' : 'Chemical Reagent (Eliminate 2)'}
              </button>
            </div>
          </div>
        </div>

        {/* Vintage Typewriter Keyboard */}
        <div className="mt-4 pt-4 border-t border-[#D8CFBC]">
          <div className="text-center font-mono text-[11px] text-[#7D7063] uppercase tracking-wider mb-2">
            TAP TYPEWRITER KEYS OR TYPE ON YOUR PHYSICAL KEYBOARD
          </div>
          <TypewriterKeyboard
            guessedLetters={guessedLetters}
            secretWord={currentCase.word}
            disabled={status !== 'playing'}
            onGuess={handleGuess}
          />
        </div>
      </main>

      {/* Footer & Bureau Case Department Index */}
      <footer className="mt-4 pt-3 border-t border-[#D8CFBC] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#7D7063]">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-[#8C6D3F]" />
          <span>Case {caseIndex + 1} of {CASE_ARCHIVES.length} in Archive</span>
          {caseIndex < 5 && (
            <span className="font-bold text-[#2D5A43] bg-[#E7F0EB] px-1.5 py-0.5 rounded text-[10px]">
              Assignment Core Word
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReplay}
            className="hover:text-[#1F1B18] underline underline-offset-2 transition-colors"
          >
            Reset Case
          </button>
          <span>•</span>
          <button
            onClick={handleNextCase}
            className="hover:text-[#1F1B18] font-bold underline underline-offset-2 transition-colors"
          >
            Next Dossier &rarr;
          </button>
        </div>
      </footer>

      {/* Modals */}
      {showBriefing && (
        <CaseBriefingModal
          caseFile={currentCase}
          hintUsed={hintUsed}
          onUseHint={() => setHintUsed(true)}
          onClose={() => setShowBriefing(false)}
        />
      )}

      {showStats && (
        <DetectiveStatsModal
          stats={stats}
          onClose={() => setShowStats(false)}
        />
      )}

      {showCustomModal && (
        <CustomCaseModal
          onStartCustomCase={handleStartCustomCase}
          onClose={() => setShowCustomModal(false)}
        />
      )}

      {showGameOver && (
        <GameOverModal
          status={status}
          caseFile={currentCase}
          mistakes={mistakes}
          maxMistakes={MAX_MISTAKES}
          onNextCase={handleNextCase}
          onReplay={handleReplay}
        />
      )}
    </div>
  );
};
