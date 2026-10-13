import React from 'react';
import { PlayerStats } from '../types';
import { X, Award, Flame, CheckCircle, Target, Trophy } from 'lucide-react';

interface DetectiveStatsModalProps {
  stats: PlayerStats;
  onClose: () => void;
}

export const DetectiveStatsModal: React.FC<DetectiveStatsModalProps> = ({
  stats,
  onClose
}) => {
  const winRate = stats.casesAttempted > 0 
    ? Math.round((stats.casesSolved / stats.casesAttempted) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-serif">
      <div className="relative w-full max-w-md bg-[#FAF6EE] border-4 border-[#C7BBA7] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#EAE0CD] border-b-2 border-[#C7BBA7]">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-[#8C6D3F]" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-[#594E42]">
              BUREAU SERVICE RECORD
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#594E42] hover:text-[#1F1B18] transition-colors rounded-sm hover:bg-[#DCD0BB]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-[#F3EDE2] rounded border border-[#DCD0BB]">
              <div className="font-mono text-2xl font-bold text-[#1F1B18]">
                {stats.casesAttempted}
              </div>
              <div className="text-[11px] font-mono uppercase text-[#665C54] mt-0.5">
                Cases Opened
              </div>
            </div>

            <div className="p-3 bg-[#F3EDE2] rounded border border-[#DCD0BB]">
              <div className="font-mono text-2xl font-bold text-[#2D5A43]">
                {stats.casesSolved}
              </div>
              <div className="text-[11px] font-mono uppercase text-[#665C54] mt-0.5">
                Cracked ({winRate}%)
              </div>
            </div>

            <div className="p-3 bg-[#F3EDE2] rounded border border-[#DCD0BB] flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 font-mono text-2xl font-bold text-[#8C1D24]">
                <Flame size={20} />
                <span>{stats.currentStreak}</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#665C54] mt-0.5">
                Current Streak
              </div>
            </div>

            <div className="p-3 bg-[#F3EDE2] rounded border border-[#DCD0BB] flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 font-mono text-2xl font-bold text-[#8C6D3F]">
                <Award size={20} />
                <span>{stats.bestStreak}</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-[#665C54] mt-0.5">
                Best Streak
              </div>
            </div>
          </div>

          {/* Honors & Commendations */}
          <div className="space-y-2 border-t border-[#DCD0BB] pt-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#7D5A3B] mb-2">
              COMMENDATION RIBBONS
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded border border-[#E5DAC8] text-xs">
              <span className="flex items-center gap-2 font-mono text-[#332D28]">
                <CheckCircle size={15} className="text-[#2D5A43]" /> Flawless Cases (0 Mistakes)
              </span>
              <span className="font-mono font-bold text-[#1F1B18]">{stats.perfectCases}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#FAF8F2] rounded border border-[#E5DAC8] text-xs">
              <span className="flex items-center gap-2 font-mono text-[#332D28]">
                <Target size={15} className="text-[#8C6D3F]" /> Blitz Interrogations Solved
              </span>
              <span className="font-mono font-bold text-[#1F1B18]">{stats.blitzVictories}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#2A2421] hover:bg-[#1A1816] text-[#FAF6EE] font-mono text-xs font-bold uppercase tracking-wider rounded shadow transition-all"
            >
              Close Record Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
