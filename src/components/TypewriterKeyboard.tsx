import React, { useEffect } from 'react';

interface TypewriterKeyboardProps {
  guessedLetters: string[];
  secretWord: string;
  disabled: boolean;
  onGuess: (letter: string) => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const TypewriterKeyboard: React.FC<TypewriterKeyboardProps> = ({
  guessedLetters,
  secretWord,
  disabled,
  onGuess
}) => {
  // Listen for physical desktop keyboard presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      // Don't trigger if user is typing in an input field (e.g. custom case modal)
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char) && !guessedLetters.includes(char)) {
        onGuess(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, guessedLetters, onGuess]);

  const getKeyState = (letter: string) => {
    if (!guessedLetters.includes(letter)) return 'idle';
    if (secretWord.includes(letter)) return 'correct';
    return 'incorrect';
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2 select-none pt-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center gap-1.5 sm:gap-2.5 w-full">
          {row.map((letter) => {
            const state = getKeyState(letter);
            const isGuessed = state !== 'idle';

            let keyStyle = 'bg-[#FAF6EE] text-[#24201D] border-[#C7BBA7] shadow-[0_3px_0_#9E907B] hover:translate-y-[-1px]';
            if (state === 'correct') {
              keyStyle = 'bg-[#2D5A43] text-[#FAF6EE] border-[#1E3E2E] shadow-[0_1px_0_#1E3E2E] opacity-90 cursor-default';
            } else if (state === 'incorrect') {
              keyStyle = 'bg-[#DCD4C4] text-[#8C1D24] line-through border-[#BDB09B] shadow-none opacity-60 cursor-default';
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={disabled || isGuessed}
                onClick={() => onGuess(letter)}
                aria-label={`Typewriter key ${letter}`}
                className={`
                  typewriter-key
                  relative w-8 h-10 sm:w-11 sm:h-12 md:w-13 md:h-14
                  rounded-full flex flex-col items-center justify-center
                  border-2 font-mono font-bold text-sm sm:text-base md:text-lg
                  transition-all active:translate-y-[2px] active:shadow-none
                  ${keyStyle}
                  ${disabled && !isGuessed ? 'opacity-40 cursor-not-allowed' : ''}
                `}
              >
                {/* Vintage metallic ring border detail */}
                <span className="absolute inset-[2px] rounded-full border border-black/10 pointer-events-none" />
                <span className="relative z-10 leading-none">{letter}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
