import React from 'react';
import { CaseFile } from '../types';
import { X, ShieldAlert, KeyRound, Sparkles } from 'lucide-react';

interface CaseBriefingModalProps {
  caseFile: CaseFile;
  hintUsed: boolean;
  onUseHint: () => void;
  onClose: () => void;
}

export const CaseBriefingModal: React.FC<CaseBriefingModalProps> = ({
  caseFile,
  hintUsed,
  onUseHint,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF6EE] border-4 border-[#C7BBA7] rounded-lg shadow-2xl overflow-hidden font-serif">
        {/* Manila Folder Tab & Brass Paperclip */}
        <div className="relative flex items-center justify-between px-6 py-3 bg-[#EAE0CD] border-b-2 border-[#C7BBA7]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8C1D24]" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-[#594E42]">
              CONFIDENTIAL BUREAU DOSSIER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#594E42] hover:text-[#1F1B18] transition-colors rounded-sm hover:bg-[#DCD0BB]"
            aria-label="Close dossier"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dossier Content */}
        <div className="p-6 space-y-5">
          {/* Case Header */}
          <div className="border-b border-[#D8CFBC] pb-3">
            <div className="flex items-center justify-between font-mono text-xs text-[#8C1D24] font-semibold mb-1">
              <span>{caseFile.caseNumber}</span>
              <span className="bg-[#EFE6D6] px-2 py-0.5 rounded border border-[#D5C7B0] text-[#594E42]">
                {caseFile.department}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F1B18] tracking-tight">
              {caseFile.title}
            </h2>
            <div className="text-xs font-mono text-[#7D7063] mt-1">
              DIFFICULTY RATING: <strong className="text-[#8C6D3F]">{caseFile.difficulty.toUpperCase()}</strong> ({caseFile.word.length} LETTERS)
            </div>
          </div>

          {/* Investigation Briefing */}
          <div className="bg-[#F3EDE2] p-4 rounded border border-[#DDD2BE] text-sm leading-relaxed text-[#332D28] font-mono">
            <div className="text-xs font-bold text-[#7D5A3B] uppercase mb-1.5 flex items-center gap-1.5">
              <ShieldAlert size={14} /> FIELD SUMMARY & OBSERVATIONS
            </div>
            <p className="italic">"{caseFile.briefing}"</p>
          </div>

          {/* Forensic Hint Option */}
          <div className="bg-[#FAF8F2] p-4 rounded border-2 border-dashed border-[#D5C7B0] text-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#594E42] flex items-center gap-1.5">
                <KeyRound size={14} className="text-[#8C6D3F]" />
                FORENSIC LAB NOTE
              </div>
              {!hintUsed && (
                <span className="text-[11px] font-mono text-[#8C6D3F] bg-[#FAF1D6] px-2 py-0.5 rounded">
                  Available (Costs 0 strikes)
                </span>
              )}
            </div>

            {hintUsed ? (
              <p className="text-sm font-mono text-[#1F1B18] bg-[#EFE8D8] p-3 rounded border border-[#D8CFBC]">
                🔍 <strong>Clue:</strong> {caseFile.forensicHint}
              </p>
            ) : (
              <div className="text-center py-2">
                <p className="text-xs text-[#665C54] mb-3 font-mono">
                  Decrypt the forensic analysis report for an investigative nudge.
                </p>
                <button
                  type="button"
                  onClick={onUseHint}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8C6D3F] hover:bg-[#725730] text-[#FFFDF8] font-mono text-xs font-bold uppercase rounded shadow-sm transition-all"
                >
                  <Sparkles size={14} /> Reveal Forensic Clue
                </button>
              </div>
            )}
          </div>

          {/* Return button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-[#2A2421] hover:bg-[#1A1816] text-[#FAF6EE] font-mono text-xs font-bold uppercase tracking-wider rounded shadow transition-all"
            >
              Resume Investigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
