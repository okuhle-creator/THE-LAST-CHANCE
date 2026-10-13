import { CaseFile } from '../types';

export const CASE_ARCHIVES: CaseFile[] = [
  // --- The Bureau Originals (Classic 5) ---
  {
    id: 'case-01',
    caseNumber: 'FILE #101',
    word: 'DETECTIVE',
    title: 'The Inquisitor of Baker Street',
    department: 'Classic Archive',
    difficulty: 'Inspector',
    briefing: 'A principal investigator tasked with piecing together fractured crime scenes and pursuing elusive suspects through the fog-drenched alleyways.',
    forensicHint: 'The professional title worn by those who unravel mysteries for a living.'
  },
  {
    id: 'case-02',
    caseNumber: 'FILE #102',
    word: 'SUSPECT',
    title: 'The Shadow in the Velvet Coat',
    department: 'Classic Archive',
    difficulty: 'Novice',
    briefing: 'A person of high interest whose alibi has collapsed under rigorous interrogation. Last seen exiting the rear parlor before midnight.',
    forensicHint: 'An individual under formal suspicion of committing a crime.'
  },
  {
    id: 'case-03',
    caseNumber: 'FILE #103',
    word: 'MYSTERY',
    title: 'The Locked Manor Paradox',
    department: 'Classic Archive',
    difficulty: 'Novice',
    briefing: 'An enigmatic puzzle where every known fact defies ordinary logic. No forced entry was detected, yet the safe lies empty.',
    forensicHint: 'Something that remains unexplained, secret, or impossible to understand at first glance.'
  },
  {
    id: 'case-04',
    caseNumber: 'FILE #104',
    word: 'EVIDENCE',
    title: 'The Singed Matchbook',
    department: 'Classic Archive',
    difficulty: 'Inspector',
    briefing: 'Material proof recovered from the hearth: physical traces linking the perpetrator directly to the sovereign vault.',
    forensicHint: 'Facts or physical objects presented in court to prove or disprove a claim.'
  },
  {
    id: 'case-05',
    caseNumber: 'FILE #105',
    word: 'JUSTICE',
    title: 'The Scales of the High Court',
    department: 'Classic Archive',
    difficulty: 'Novice',
    briefing: 'The ultimate standard pursued by the bureau. Neither wealth nor influence can tilt the solemn verdict of the magistrate.',
    forensicHint: 'Fairness, moral rightness, and the lawful administration of truth.'
  },

  // --- Homicide & Clues ---
  {
    id: 'case-06',
    caseNumber: 'FILE #201',
    word: 'ALIBI',
    title: 'The Clockmaker’s Witness',
    department: 'Homicide & Clues',
    difficulty: 'Novice',
    briefing: 'The defendant claims to have been dining at the Grand Continental during the exact hour of the vault breach. Verification is underway.',
    forensicHint: 'Proof that an accused person was elsewhere when an offense was committed.'
  },
  {
    id: 'case-07',
    caseNumber: 'FILE #202',
    word: 'BALLISTICS',
    title: 'The Grooved Projectile',
    department: 'Homicide & Clues',
    difficulty: 'Mastermind',
    briefing: 'The lead slug recovered from the oak mantle bears unique rifling striations matching an antique custom Belgian sidearm.',
    forensicHint: 'The scientific study of firearms, gunpowder trajectories, and ammunition.'
  },
  {
    id: 'case-08',
    caseNumber: 'FILE #203',
    word: 'CORONER',
    title: 'The Midnight Autopsy',
    department: 'Homicide & Clues',
    difficulty: 'Novice',
    briefing: 'The city official who conducts post-mortem examinations to determine the exact timestamp and cause of unnatural demise.',
    forensicHint: 'The medical examiner responsible for investigating unexplained deaths.'
  },
  {
    id: 'case-09',
    caseNumber: 'FILE #204',
    word: 'FOOTPRINT',
    title: 'The Muddy Parquet',
    department: 'Homicide & Clues',
    difficulty: 'Inspector',
    briefing: 'A singular size-eleven boot impression pressed into river clay along the rear carriage entrance of the conservatory.',
    forensicHint: 'A telltale impression left upon soft ground by footwear.'
  },
  {
    id: 'case-10',
    caseNumber: 'FILE #205',
    word: 'POISON',
    title: 'The Bitter Almond Carafe',
    department: 'Homicide & Clues',
    difficulty: 'Novice',
    briefing: 'Traces of odorless cyanide detected in the evening vintage served to Lord Harrington shortly before his sudden collapse.',
    forensicHint: 'A lethal substance capable of causing sickness or death when consumed.'
  },
  {
    id: 'case-11',
    caseNumber: 'FILE #206',
    word: 'REVOLVER',
    title: 'The Six-Chamber Chamber',
    department: 'Homicide & Clues',
    difficulty: 'Inspector',
    briefing: 'A nickel-plated firearm discarded inside the municipal fountain with five spent cartridges and one hammer cocked.',
    forensicHint: 'A handgun equipped with a revolving cylinder holding several cartridges.'
  },

  // --- The Syndicate & Espionage ---
  {
    id: 'case-12',
    caseNumber: 'FILE #301',
    word: 'CONSPIRACY',
    title: 'The Gilded Cabal',
    department: 'The Syndicate',
    difficulty: 'Mastermind',
    briefing: 'Intercepted telegrams expose a clandestine pact between high-ranking port inspectors and the waterfront smuggling ring.',
    forensicHint: 'A secret plan by a group to do something unlawful or harmful.'
  },
  {
    id: 'case-13',
    caseNumber: 'FILE #302',
    word: 'SYNDICATE',
    title: 'The Dockside Cartel',
    department: 'The Syndicate',
    difficulty: 'Inspector',
    briefing: 'A powerful, multi-tiered criminal organization controlling the export of stolen antiquities along the eastern canal.',
    forensicHint: 'A group of individuals or organizations united to control an enterprise.'
  },
  {
    id: 'case-14',
    caseNumber: 'FILE #303',
    word: 'SMUGGLER',
    title: 'The Midnight Barge',
    department: 'The Syndicate',
    difficulty: 'Inspector',
    briefing: 'A maritime captain transporting unregistered crates of unrefined gold bullion concealed beneath coal ballast.',
    forensicHint: 'A person who covertly imports or exports goods illegally.'
  },
  {
    id: 'case-15',
    caseNumber: 'FILE #304',
    word: 'BLACKMAIL',
    title: 'The Compromising Negatives',
    department: 'The Syndicate',
    difficulty: 'Inspector',
    briefing: 'An extortionist demands ten thousand sovereigns in exchange for withholding photographic evidence from the morning gazette.',
    forensicHint: 'Demanding payment in return for not revealing compromising secrets.'
  },
  {
    id: 'case-16',
    caseNumber: 'FILE #305',
    word: 'COUNTERFEIT',
    title: 'The Bohemian Engraver',
    department: 'The Syndicate',
    difficulty: 'Mastermind',
    briefing: 'Imitation banknotes printed with near-flawless watermark stamps have flooded the commercial quarter since Tuesday.',
    forensicHint: 'An imitation made with intent to deceive and defraud; fraudulent money.'
  },
  {
    id: 'case-17',
    caseNumber: 'FILE #306',
    word: 'EMBEZZLE',
    title: 'The Phantom Ledgers',
    department: 'The Syndicate',
    difficulty: 'Inspector',
    briefing: 'A discreet accountant routed private treasury bonds through falsified overseas charitable endowments over a decade.',
    forensicHint: 'Steal or misappropriate funds placed in one’s trust or employment.'
  },

  // --- Forensic Science ---
  {
    id: 'case-18',
    caseNumber: 'FILE #401',
    word: 'FINGERPRINT',
    title: 'The Crystal Goblet Impression',
    department: 'Forensic Science',
    difficulty: 'Mastermind',
    briefing: 'A clear whorl pattern dusted on the rim of the port decanter. Chemical reagents confirm an exact match with archive record 304.',
    forensicHint: 'An impression left by the friction ridges of a human finger.'
  },
  {
    id: 'case-19',
    caseNumber: 'FILE #402',
    word: 'FORENSICS',
    title: 'The Scientific Laboratory',
    department: 'Forensic Science',
    difficulty: 'Inspector',
    briefing: 'The application of strict chemistry, pathology, and physical sciences to uncover truth beneath deceptive facades.',
    forensicHint: 'Scientific tests or techniques used in the investigation of crimes.'
  },
  {
    id: 'case-20',
    caseNumber: 'FILE #403',
    word: 'MICROSCOPE',
    title: 'The Thread Analysis',
    department: 'Forensic Science',
    difficulty: 'Mastermind',
    briefing: 'High-power optical magnification reveals that the fabric snagged on the window iron is dyed Scottish tweed wool.',
    forensicHint: 'An optical instrument used for viewing very small objects.'
  },
  {
    id: 'case-21',
    caseNumber: 'FILE #404',
    word: 'CIPHER',
    title: 'The Encrypted Diary',
    department: 'Forensic Science',
    difficulty: 'Novice',
    briefing: 'A journal handwritten in complex substitution symbols found stitched inside the lining of the courier’s traveling coat.',
    forensicHint: 'A secret or disguised way of writing; an encoded message.'
  },
  {
    id: 'case-22',
    caseNumber: 'FILE #405',
    word: 'DOSSIER',
    title: 'The Red Manila Folder',
    department: 'Forensic Science',
    difficulty: 'Inspector',
    briefing: 'A classified intelligence binder containing detailed background records, photographs, and surveillance logs of target persons.',
    forensicHint: 'A collection of documents about a particular person, event, or subject.'
  },

  // --- Court & Law ---
  {
    id: 'case-23',
    caseNumber: 'FILE #501',
    word: 'TESTIMONY',
    title: 'The Butler’s Sworn Account',
    department: 'Court & Law',
    difficulty: 'Inspector',
    briefing: 'Formal declarations made before the magistrate under sacred oath, clarifying the precise timeline of Lord Ashford’s departure.',
    forensicHint: 'A formal written or spoken statement given in court.'
  },
  {
    id: 'case-24',
    caseNumber: 'FILE #502',
    word: 'VERDICT',
    title: 'The Foreman’s Decision',
    department: 'Court & Law',
    difficulty: 'Inspector',
    briefing: 'The unanimous decision reached by the twelve jurors after five hours of deliberation in the chamber.',
    forensicHint: 'A formal decision on a disputed issue in a civil or criminal case.'
  },
  {
    id: 'case-25',
    caseNumber: 'FILE #503',
    word: 'WARRANT',
    title: 'The Magistrate’s Seal',
    department: 'Court & Law',
    difficulty: 'Inspector',
    briefing: 'A signed judicial parchment authorizing detectives to force entry into the warehouse on Pier 9 before dawn.',
    forensicHint: 'A legal document issued by a judge authorizing police to make an arrest or search.'
  },
  {
    id: 'case-26',
    caseNumber: 'FILE #504',
    word: 'PERJURY',
    title: 'The False Oath',
    department: 'Court & Law',
    difficulty: 'Inspector',
    briefing: 'The carriage driver contradicted his own earlier deposition, knowingly swearing to an untruth upon the witness stand.',
    forensicHint: 'The offense of willfully telling an untruth in a court after taking an oath.'
  },
  {
    id: 'case-27',
    caseNumber: 'FILE #505',
    word: 'ACQUITTAL',
    title: 'The Exoneration',
    department: 'Court & Law',
    difficulty: 'Inspector',
    briefing: 'When prosecutors failed to substantiate chain-of-custody for the stolen diamonds, the judge ordered the prisoner freed.',
    forensicHint: 'A judgment that a person is not guilty of the crime with which they have been charged.'
  },

  // --- The Detective Craft ---
  {
    id: 'case-28',
    caseNumber: 'FILE #601',
    word: 'DEDUCTION',
    title: 'The Logic of the Pipe',
    department: 'Classic Archive',
    difficulty: 'Inspector',
    briefing: 'Drawing undeniable conclusions from seemingly trivial observations: chalk on a sleeve, ash from a Cuban cigar.',
    forensicHint: 'The inference of particular instances by reference to a general law or premise.'
  },
  {
    id: 'case-29',
    caseNumber: 'FILE #602',
    word: 'INTERROGATION',
    title: 'The Third Degree',
    department: 'Classic Archive',
    difficulty: 'Mastermind',
    briefing: 'The intensive questioning of a stubborn suspect in a soundproof room until the conflicting timelines break down.',
    forensicHint: 'The action of interrogating or questioning someone closely and formally.'
  },
  {
    id: 'case-30',
    caseNumber: 'FILE #603',
    word: 'SURVEILLANCE',
    title: 'The Stakeout at 4 AM',
    department: 'Classic Archive',
    difficulty: 'Mastermind',
    briefing: 'Stationary undercover observation maintained outside the embassy gates throughout a freezing November night.',
    forensicHint: 'Close observation, especially of a suspected spy or criminal.'
  },
  {
    id: 'case-31',
    caseNumber: 'FILE #604',
    word: 'INFORMANT',
    title: 'The Whisper in the Tavern',
    department: 'Classic Archive',
    difficulty: 'Inspector',
    briefing: 'A confidential insider who trades clandestine tips about underground illicit shipments for police protection.',
    forensicHint: 'A person who gives information to another, especially to the police.'
  },
  {
    id: 'case-32',
    caseNumber: 'FILE #605',
    word: 'CONFESSION',
    title: 'The Signed Statement',
    department: 'Classic Archive',
    difficulty: 'Mastermind',
    briefing: 'At three in the morning, the ringleader broke down and signed his full admission on official bureau parchment.',
    forensicHint: 'A formal statement admitting that one is guilty of a crime.'
  }
];

export const DETECTIVE_RANKS = [
  { minMistakes: 0, title: 'CHIEF INSPECTOR', badge: 'Flawless Deduction', description: 'Zero errors recorded. A case solved with legendary precision.' },
  { minMistakes: 1, title: 'SENIOR INVESTIGATOR', badge: 'Master Sleuth', description: 'Exceptional instinct under pressure with minimal false leads.' },
  { minMistakes: 3, title: 'STAFF DETECTIVE', badge: 'Solid Bureau Work', description: 'Methodical persistence unravelled the case despite obstacles.' },
  { minMistakes: 5, title: 'FIELD AGENT', badge: 'Close Call', description: 'Narrowly escaped the deadline. The case file is closed just in time.' }
];

export function getRankForScore(mistakes: number) {
  for (const rank of DETECTIVE_RANKS) {
    if (mistakes <= rank.minMistakes) return rank;
  }
  return DETECTIVE_RANKS[DETECTIVE_RANKS.length - 1];
}
