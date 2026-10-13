import React, { useState } from 'react';
import { CaseFile, GameStatus } from '../types';
import { getRankForScore } from '../data/cases';
import { RotateCcw, ArrowRight, Share2, Check, Award, ShieldAlert } from 'lucide-react';

interface GameOverModalProps {
  status: GameStatus;
  caseFile: CaseFile;
  mistakes: number;
  maxMistakes: number;
  onNextCase: () => void;
  onReplay: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  status,
  caseFile,
  mistakes,
  maxMistakes,
  onNextCase,
  onReplay
}) => {
  const [copied, setCopied] = useState(false);
  const isWon = status === 'won';
  const rank = getRankForScore(mistakes);

  const handleShare = () => {
    const accuracy = Math.round(((maxMistakes - mistakes) / maxMistakes) * 100);
    const text = [
      `🕵️‍♂️ BUREAU OF CRIMINAL INVESTIGATION`,
      `Case: ${caseFile.caseNumber} — ${caseFile.title}`,
      `Status: ${isWon ? 'SOLVED' : 'COLD CASE'}`,
      `Strikes: ${mistakes} / ${maxMistakes} (Accuracy: ${accuracy}%)`,
      `Detective Rank: ${isWon ? rank.title : 'SUSPECT AT LARGE'}`,
      `Cipher Word: ${caseFile.word}`,
      `Play the mystery at: https://the-last-chance-mystery.vercel.app`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in font-serif">
      <div className="relative w-full max-w-lg bg-[#FAF6EE] border-4 border-[#C7BBA7] rounded-lg shadow-2xl overflow-hidden p-6 text-center">
        {/* Animated Vintage Rubber Stamp Header */}
        <div className="mb-4">
          {isWon ? (
            <div className="inline-block px-6 py-2 border-4 border-[#2D5A43] text-[#2D5A43] font-serif font-black text-2xl uppercase tracking-widest rotate-[-4deg] bg-[#FAF7EE] shadow-sm animate-stamp">
              CASE CLOSED: SOLVED
            </div>
          ) : (
            <div className="inline-block px-6 py-2 border-4 border-[#8C1D24] text-[#8C1D24] font-serif font-black text-2xl uppercase tracking-widest rotate-[4deg] bg-[#FAF7EE] shadow-sm animate-stamp">
              CASE COLD: SUSPECT FLED
            </div>
          )}
        </div>

        {/* Case Info */}
        <div className="text-xs font-mono text-[#8C6D3F] font-bold uppercase tracking-wider mb-1">
          {caseFile.caseNumber} • {caseFile.department}
        </div>
        <h2 className="text-2xl font-bold text-[#1F1B18] mb-3">
          {caseFile.title}
        </h2>

        {/* Revealed Secret Cipher Word */}
        <div className="my-4 p-4 bg-[#F2EADB] rounded border border-[#DACFBD]">
          <div className="text-xs font-mono text-[#665C54] uppercase tracking-wider mb-2">
            THE SECRET CIPHER WORD
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xl sm:text-2xl font-bold text-[#1F1B18]">
            {caseFile.word.split('').map((char, idx) => (
              <span
                key={idx}
                className="w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center rounded bg-[#FAF6EE] border-2 border-[#C7BBA7] shadow-inner"
              >
                {char}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#594E42] italic mt-3 font-serif max-w-md mx-auto">
            "{caseFile.briefing}"
          </p>
        </div>

        {/* Detective Performance Assessment */}
        {isWon ? (
          <div className="my-4 p-3 bg-[#EBF3EE] rounded border border-[#B9D5C3] text-left">
            <div className="flex items-center gap-2 text-[#2D5A43] font-bold text-sm mb-1 font-mono uppercase">
              <Award size={18} />
              <span>BUREAU RANK: {rank.title}</span>
            </div>
            <p className="text-xs text-[#334E3E] font-serif italic mb-1">
              {rank.description}
            </p>
            <div className="text-[11px] font-mono text-[#2D5A43] font-semibold">
              Mistakes registered: <strong>{mistakes} / {maxMistakes}</strong>
            </div>
          </div>
        ) : (
          <div className="my-4 p-3 bg-[#FAECEC] rounded border border-[#E7BFBF] text-left">
            <div className="flex items-center gap-2 text-[#8C1D24] font-bold text-sm mb-1 font-mono uppercase">
              <ShieldAlert size={18} />
              <span>INVESTIGATION TIMED OUT</span>
            </div>
            <p className="text-xs text-[#6B2428] font-serif italic">
              All 6 deductions were exhausted without unraveling the cipher. The evidence has been placed in the cold archives.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF6EE] hover:bg-[#EFE8D8] text-[#332D28] border-2 border-[#C7BBA7] font-mono text-xs font-bold uppercase rounded shadow-sm transition-all"
          >
            {copied ? <Check size={16} className="text-[#2D5A43]" /> : <Share2 size={16} />}
            {copied ? 'Telegram Copied!' : 'Copy Case Dispatch'}
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EAE0CD] hover:bg-[#DCD0BB] text-[#332D28] border-2 border-[#C7BBA7] font-mono text-xs font-bold uppercase rounded shadow-sm transition-all"
          >
            <RotateCcw size={15} /> Re-Examine
          </button>

          <button
            type="button"
            onClick={onNextCase}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2A2421] hover:bg-[#1A1816] text-[#FAF6EE] font-mono text-xs font-bold uppercase rounded shadow-md transition-all"
          >
            Next Case <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
