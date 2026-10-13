import React, { useState } from 'react';
import { CaseFile } from '../types';
import { X, Lock, KeyRound } from 'lucide-react';

interface CustomCaseModalProps {
  onStartCustomCase: (customFile: CaseFile) => void;
  onClose: () => void;
}

export const CustomCaseModal: React.FC<CustomCaseModalProps> = ({
  onStartCustomCase,
  onClose
}) => {
  const [word, setWord] = useState('');
  const [title, setTitle] = useState('');
  const [hint, setHint] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = word.trim().toUpperCase();

    if (!cleanWord || !/^[A-Z]+$/.test(cleanWord)) {
      setError('Cipher word must contain only letters (A-Z) with no spaces or symbols.');
      return;
    }
    if (cleanWord.length < 3 || cleanWord.length > 15) {
      setError('Word must be between 3 and 15 characters.');
      return;
    }

    const customFile: CaseFile = {
      id: `custom-${Date.now()}`,
      caseNumber: 'FILE #SECRET',
      word: cleanWord,
      title: title.trim() || 'The Sealed Interrogation',
      department: 'Classic Archive',
      difficulty: cleanWord.length <= 6 ? 'Novice' : cleanWord.length <= 9 ? 'Inspector' : 'Mastermind',
      briefing: 'A sealed custom inquiry created by a fellow operative.',
      forensicHint: hint.trim() || 'No additional forensic notes filed for this inquiry.'
    };

    onStartCustomCase(customFile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-serif">
      <div className="relative w-full max-w-md bg-[#FAF6EE] border-4 border-[#C7BBA7] rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#EAE0CD] border-b-2 border-[#C7BBA7]">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#8C1D24]" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-widest text-[#594E42]">
              SEAL A CONFIDENTIAL CASE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#594E42] hover:text-[#1F1B18] transition-colors rounded-sm hover:bg-[#DCD0BB]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-[#665C54] font-mono leading-relaxed">
            Enter your own secret cipher word to challenge a colleague or test your partner's investigative deductive powers.
          </p>

          {error && (
            <div className="p-2.5 bg-[#FAECEC] border border-[#E7BFBF] text-[#8C1D24] text-xs font-mono rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#332D28] mb-1">
              Secret Cipher Word <span className="text-[#8C1D24]">*</span>
            </label>
            <input
              type="password"
              autoComplete="off"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setError('');
              }}
              placeholder="e.g. CONSPIRACY"
              maxLength={15}
              className="w-full px-3 py-2 bg-[#F3EDE2] border-2 border-[#C7BBA7] rounded font-mono text-sm tracking-widest text-[#1F1B18] focus:outline-none focus:border-[#8C6D3F]"
              required
            />
            <span className="text-[11px] text-[#7D7063] font-mono">Kept masked so your opponent cannot peek.</span>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#332D28] mb-1">
              Case Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Locked Cell Mystery"
              maxLength={40}
              className="w-full px-3 py-2 bg-[#F3EDE2] border border-[#C7BBA7] rounded font-serif text-sm text-[#1F1B18] focus:outline-none focus:border-[#8C6D3F]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#332D28] mb-1">
              Forensic Clue / Hint (Optional)
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="e.g. Pertains to an illicit clandestine meeting..."
              maxLength={80}
              className="w-full px-3 py-2 bg-[#F3EDE2] border border-[#C7BBA7] rounded font-serif text-sm text-[#1F1B18] focus:outline-none focus:border-[#8C6D3F]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#EAE0CD] hover:bg-[#DCD0BB] text-[#332D28] font-mono text-xs font-bold uppercase rounded transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#2A2421] hover:bg-[#1A1816] text-[#FAF6EE] font-mono text-xs font-bold uppercase tracking-wider rounded shadow transition-all"
            >
              <KeyRound size={14} /> Seal & Interrogate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
