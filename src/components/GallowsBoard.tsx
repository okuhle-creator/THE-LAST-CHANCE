import React from 'react';

interface GallowsBoardProps {
  mistakes: number;
  maxMistakes: number;
  isWon: boolean;
  isLost: boolean;
}

export const GallowsBoard: React.FC<GallowsBoardProps> = ({
  mistakes,
  maxMistakes,
  isWon,
  isLost
}) => {
  // 6 distinct stages for mistakes
  const showNoose = mistakes >= 1;
  const showHead = mistakes >= 2;
  const showTorso = mistakes >= 3;
  const showLeftArm = mistakes >= 4;
  const showRightArm = mistakes >= 5;
  const showLegs = mistakes >= 6;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-[#F5EFE6] border-2 border-[#D8CFBC] rounded-lg shadow-inner select-none overflow-hidden">
      {/* Evidence Tag Header */}
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-[#D8CFBC]/80 text-xs font-mono tracking-wider text-[#665C54]">
        <span className="flex items-center gap-1.5 font-bold uppercase">
          <span className="inline-block w-2 h-2 rounded-full bg-[#8C1D24]"></span>
          EVIDENCE VISUALIZER
        </span>
        <span className="font-semibold text-[#8C1D24]">
          STRIKES: {mistakes} / {maxMistakes}
        </span>
      </div>

      {/* SVG Canvas with Hand-Inked Sketch Style */}
      <div className="relative w-full max-w-[280px] h-[240px] flex items-center justify-center">
        <svg
          viewBox="0 0 240 220"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          stroke="#2A2421"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Base Platform (Gallows foundation timber) */}
          <path d="M 20 205 L 140 205" strokeWidth="4.5" />
          <path d="M 35 205 L 45 200 L 115 200 L 125 205" strokeWidth="2" strokeDasharray="2,2" opacity="0.6" />
          
          {/* Vertical Post */}
          <path d="M 50 205 L 50 35" strokeWidth="4.5" />
          
          {/* Top Beam */}
          <path d="M 46 35 L 175 35" strokeWidth="4.5" />
          
          {/* Diagonal Timber Brace */}
          <path d="M 50 75 L 90 35" strokeWidth="3" />

          {/* Hanging Rope / Noose (Mistake 1) */}
          {showNoose && (
            <g className="transition-all duration-300">
              <path d="M 160 35 L 160 70" stroke="#7D5A3B" strokeWidth="3" strokeDasharray="3,1.5" />
              <ellipse cx="160" cy="76" rx="6" ry="8" stroke="#7D5A3B" strokeWidth="2.5" />
            </g>
          )}

          {/* Suspect Head & Fedora (Mistake 2) */}
          {showHead && (
            <g className="transition-all duration-300">
              {/* Silhouette head */}
              <circle cx="160" cy="92" r="14" fill="#2A2421" stroke="#2A2421" strokeWidth="2" />
              {/* Detective fedora brim & crown */}
              <path d="M 138 84 Q 160 82 182 84" stroke="#1A1816" strokeWidth="3.5" fill="none" />
              <path d="M 148 84 L 152 74 Q 160 71 168 74 L 172 84 Z" fill="#1A1816" stroke="#1A1816" strokeWidth="2" />
              {/* Fedora band */}
              <path d="M 151 81 Q 160 80 169 81" stroke="#8C1D24" strokeWidth="2.5" />
            </g>
          )}

          {/* Torso & Trench Coat (Mistake 3) */}
          {showTorso && (
            <g className="transition-all duration-300">
              {/* Trench coat body */}
              <path d="M 160 106 L 160 152" stroke="#2A2421" strokeWidth="6" />
              {/* Coat lapels */}
              <path d="M 152 110 L 160 128 L 168 110" stroke="#443A33" strokeWidth="2" />
            </g>
          )}

          {/* Left Arm (Mistake 4) */}
          {showLeftArm && (
            <path d="M 160 114 L 138 136" stroke="#2A2421" strokeWidth="4.5" className="transition-all duration-300" />
          )}

          {/* Right Arm (Mistake 5) */}
          {showRightArm && (
            <path d="M 160 114 L 182 136" stroke="#2A2421" strokeWidth="4.5" className="transition-all duration-300" />
          )}

          {/* Legs & Boots (Mistake 6) */}
          {showLegs && (
            <g className="transition-all duration-300">
              <path d="M 160 152 L 145 188" stroke="#2A2421" strokeWidth="4.5" />
              <path d="M 160 152 L 175 188" stroke="#2A2421" strokeWidth="4.5" />
              {/* Boots */}
              <path d="M 145 188 L 138 190" stroke="#1A1816" strokeWidth="4" />
              <path d="M 175 188 L 182 190" stroke="#1A1816" strokeWidth="4" />
            </g>
          )}

          {/* Brass Lantern hanging on gallows post for warm authentic atmosphere */}
          <g opacity="0.85">
            <path d="M 50 90 L 30 90" stroke="#8C6D3F" strokeWidth="2" />
            <path d="M 30 90 L 30 98" stroke="#8C6D3F" strokeWidth="2" />
            <rect x="23" y="98" width="14" height="18" rx="2" fill="#FAF1D6" stroke="#8C6D3F" strokeWidth="2" />
            <circle cx="30" cy="107" r="3" fill="#D99B26" />
          </g>
        </svg>

        {/* Dynamic Watermark Stamp Overlay on Outcome */}
        {isWon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-stamp">
            <div className="px-5 py-2 border-4 border-[#2D5A43] text-[#2D5A43] font-serif font-black text-2xl uppercase tracking-widest rotate-[-12deg] bg-[#FAF7EE]/90 shadow-md">
              CASE SOLVED
            </div>
          </div>
        )}

        {isLost && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-stamp">
            <div className="px-5 py-2 border-4 border-[#8C1D24] text-[#8C1D24] font-serif font-black text-2xl uppercase tracking-widest rotate-[14deg] bg-[#FAF7EE]/90 shadow-md">
              SUSPECT FLED
            </div>
          </div>
        )}
      </div>

      {/* Wax Seal Strike Indicator Badges */}
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#D8CFBC]/60">
        {Array.from({ length: maxMistakes }).map((_, index) => {
          const isTriggered = index < mistakes;
          return (
            <div
              key={index}
              title={`Strike ${index + 1}`}
              className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                isTriggered
                  ? 'bg-[#8C1D24] text-[#FFF8F0] shadow-sm scale-105 border border-[#5E1218]'
                  : 'bg-[#E5DAC8] text-[#857767] border border-[#C5B7A1]'
              }`}
            >
              {isTriggered ? '✕' : index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
