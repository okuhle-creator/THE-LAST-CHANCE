"""
=============================================================================
PROJECT: HANGMAN: THE LAST CHANCE
A Detective-Themed Console Hangman Game in Python
=============================================================================
This program fulfills all assignment criteria using fundamental Python concepts:
- Predefined list of exactly 5 secret words.
- Random word selection with the `random` module.
- While loops for turn iterations and game replays.
- If-else logic for input validation, guess checks, and win/loss states.
- Clean ASCII hangman visuals, detective ranks, and suspenseful feedback.
=============================================================================
"""

import random

# Predefined list of exactly 5 mystery words (as required by the assignment)
WORDS = ["DETECTIVE", "SUSPECT", "MYSTERY", "EVIDENCE", "JUSTICE"]

# ASCII stages corresponding to 0 to 6 incorrect guesses
HANGMAN_STAGES = [
    """
       +---+
       |   |
           |
           |
           |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
           |
           |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
       |   |
           |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
      /|   |
           |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
      /|\\  |
           |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
      /|\\  |
      /    |
           |
    =========
    """,
    """
       +---+
       |   |
       O   |
      /|\\  |
      / \\  |
           |
    =========
    """
]

# Random flavor messages to make rounds feel dynamic
CORRECT_MESSAGES = [
    "Sharp eye, Detective! That letter fits the cipher.",
    "Brilliant deduction! The clue is falling into place.",
    "Spot on! The mystery unravels one step further.",
    "Great instinct! You found a matching letter."
]

INCORRECT_MESSAGES = [
    "False lead! That letter is nowhere in the secret cipher.",
    "Dead end! The clock ticks down and the noose tightens.",
    "Careful, Detective! The suspect is slipping away.",
    "Wrong trail! That guess brings you one step closer to danger."
]


def print_banner():
    """Displays the dramatic game title and detective briefing."""
    print("=" * 60)
    print("             HANGMAN: THE LAST CHANCE")
    print("        A High-Stakes Detective Word Mystery")
    print("=" * 60)
    print("MISSION BRIEFING:")
    print("  You are a master detective interrogating a top-secret case.")
    print("  Crack the secret word letter-by-letter before time expires.")
    print("  You are allowed a maximum of 6 incorrect guesses.")
    print("  Good luck, Detective. The clock is ticking!\n")


def display_game_status(secret_word, guessed_letters, incorrect_count):
    """
    Renders the current game board:
    - ASCII Hangman gallows based on mistakes made
    - Hidden word formatted with revealed letters and underscores
    - Guessed letters history and remaining attempts
    """
    # 1. Print current ASCII gallows
    print(HANGMAN_STAGES[incorrect_count])

    # 2. Build the display word: show letter if guessed, otherwise show '_'
    revealed_word_parts = []
    for letter in secret_word:
        if letter in guessed_letters:
            revealed_word_parts.append(letter)
        else:
            revealed_word_parts.append("_")
    
    # Join with spaces for easy reading (e.g., "_ E _ E _ _")
    formatted_word = " ".join(revealed_word_parts)

    # 3. Print the formatted word and detective status counters
    print(f"  CIPHER WORD:     {formatted_word}")
    print(f"  MISTAKES:        {incorrect_count} / 6")
    print(f"  REMAINING TRIES: {6 - incorrect_count}")
    
    # Show sorted list of guessed letters so the player doesn't forget
    if len(guessed_letters) > 0:
        guesses_display = ", ".join(sorted(guessed_letters))
    else:
        guesses_display = "None"
    print(f"  GUESSED LETTERS: {guesses_display}")
    print("-" * 60)


def get_detective_rank(incorrect_count):
    """Calculates and returns the detective rank based on mistakes made."""
    if incorrect_count == 0:
        return "PERFECT DETECTIVE (Flawless investigation! Zero mistakes!)"
    elif incorrect_count in [1, 2]:
        return "MASTER DETECTIVE (Impressive deduction under pressure!)"
    elif incorrect_count in [3, 4]:
        return "SHARP INVESTIGATOR (Case solved, though it was close!)"
    else:
        return "LUCKY SURVIVOR (Escaped by the skin of your teeth!)"


def play_round():
    """Runs a single complete round of Hangman."""
    # Step 1: Select a random word from the 5 predefined words
    secret_word = random.choice(WORDS)
    
    # Step 2: Initialize round tracking variables
    guessed_letters = []
    incorrect_count = 0
    max_incorrect = 6

    print("\n>>> NEW CASE OPENED: A secret cipher has been chosen! <<<\n")

    # Step 3: Main game loop - runs until won or 6 incorrect guesses reached
    while incorrect_count < max_incorrect:
        # Display current status to player
        display_game_status(secret_word, guessed_letters, incorrect_count)

        # Prompt for player input
        raw_input = input("Enter your letter deduction: ").strip()

        # Input Validation: Must be exactly one alphabetical character
        if len(raw_input) != 1 or not raw_input.isalpha():
            print("\n[!] INVALID INPUT: Please enter a single alphabetic letter (A-Z).\n")
            continue

        # Standardize to uppercase
        guessed_char = raw_input.upper()

        # Check if already guessed
        if guessed_char in guessed_letters:
            print(f"\n[!] REPEATED GUESS: You already inspected '{guessed_char}'. No attempts lost.\n")
            continue

        # Add newly guessed character to tracked list
        guessed_letters.append(guessed_char)

        # Check if the guessed letter is in the secret word
        if guessed_char in secret_word:
            random_praise = random.choice(CORRECT_MESSAGES)
            print(f"\n[+] {random_praise}")
        else:
            incorrect_count += 1
            random_warning = random.choice(INCORRECT_MESSAGES)
            print(f"\n[-] {random_warning}")

        # Check Win Condition:
        # If every letter of the secret word has been guessed, the player wins!
        all_letters_found = True
        for letter in secret_word:
            if letter not in guessed_letters:
                all_letters_found = False
                break

        if all_letters_found:
            # Display final winning board state
            print("\n" + "=" * 60)
            print("                *** CASE SOLVED! VICTORY! ***")
            print("=" * 60)
            print(HANGMAN_STAGES[incorrect_count])
            print(f"  The secret word was indeed: {secret_word}")
            print(f"  Total incorrect deductions: {incorrect_count} / 6")
            print(f"  FINAL RANK: {get_detective_rank(incorrect_count)}")
            print("=" * 60 + "\n")
            return

    # If the loop finishes without returning, the player reached 6 incorrect guesses
    print("\n" + "=" * 60)
    print("              *** CASE CLOSED: SUSPECT ESCAPED! ***")
    print("=" * 60)
    print(HANGMAN_STAGES[6])
    print(f"  You have used all {max_incorrect} attempts. The cipher remained locked.")
    print(f"  THE SECRET WORD WAS: {secret_word}")
    print("  Better luck next time, Detective.\n" + "=" * 60 + "\n")


def main():
    """Main program entry point with replay control."""
    print_banner()

    keep_playing = True
    while keep_playing:
        play_round()

        # Ask player if they want to take on another case
        replay_choice = input("Would you like to take on another case? (Y/N): ").strip().upper()
        
        if replay_choice.startswith("Y"):
            print("\n" + "~" * 60)
            print("Re-assigning detective badge... Preparing a new case file!")
            print("~" * 60)
        else:
            keep_playing = False
            print("\n" + "=" * 60)
            print("  Thank you for serving the bureau, Detective!")
            print("  Badge surrendered. Until the next mystery arrives... Goodbye!")
            print("=" * 60 + "\n")


if __name__ == "__main__":
    main()

