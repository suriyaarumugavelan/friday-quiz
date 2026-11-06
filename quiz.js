// Each question earns one letter. In question order the letters are a
// scramble of RELAXATION, so the tiles still need unscrambling at the end.
window.QUIZ = {
  passwordClue: "Piglet",
  passwordHash: "417f1824ba04658978262aea110b75724ed39c984ccbed0b5c56a7ad801d0f1c",
  passwordNudges: [
    "Not quite. Think about the clue.",
    "Hmm, no. Gracie is unconvinced.",
  ],
  acceptedThemes: ["RELAXATION", "SELFCARE"],
  questions: [
    {
      prompt: "Who really runs this household?",
      options: ["Suri", "Snigdhu", "Gracie and Moo", "The Wi-Fi router"],
      correct: 2,
      praise: "Correct. The management has been notified and remains unimpressed.",
      letter: "N",
    },
    {
      prompt: "Where in Bali did you disappear for a heroic 4-hour spa session?",
      options: ["Kastara", "Uluwatu Temple", "Ubud Palace", "A Seminyak beach club"],
      correct: 0,
      praise: "Correct. Four hours. Legends are written about less.",
      letter: "A",
    },
    {
      prompt: "What's the dream retirement plan?",
      options: ["A beach shack in Goa", "A houseboat in Kerala", "A penthouse in Mumbai", "A mountain home in Gangtok"],
      correct: 3,
      praise: "Correct. Big views, zero meetings.",
      letter: "X",
    },
    {
      prompt: "Which cartoon holds the title of all-time favorite?",
      options: ["Finding Nemo", "Ratatouille", "Toy Story", "The Lion King"],
      correct: 1,
      praise: "Correct. Anyone can cook, but only one rat can do it this well.",
      letter: "L",
    },
    {
      prompt: "Which film gets the call after a brutal day at work?",
      options: ["The Devil Wears Prada", "Legally Blonde", "The Intern", "Mean Girls"],
      correct: 0,
      praise: "Correct. That's all.",
      letter: "I",
    },
    {
      prompt: "What's the guilty pleasure you'd never admit to at the office?",
      options: ["Reality dating shows", "True-crime podcasts", "Trashy Bollywood movies", "Celebrity gossip blogs"],
      correct: 2,
      praise: "Correct. The plot is optional, the drama is not.",
      letter: "O",
    },
    {
      prompt: "Which meal is worth breaking every rule for?",
      options: ["Butter chicken and naan", "Pepperoni pizza", "Masala dosa", "Rasam rice and potato"],
      correct: 3,
      praise: "Correct. A cheat meal with excellent character references.",
      letter: "R",
    },
    {
      prompt: "Which pastry has your whole heart?",
      options: ["Croissant", "Paris-Brest", "Éclair", "Mille-feuille"],
      correct: 1,
      praise: "Correct. Shaped like a wheel, and it always comes first.",
      letter: "E",
    },
    {
      prompt: "What does the perfect Saturday look like?",
      options: ["Morning coffee and a chill picnic", "A 10K and meal prep", "Hosting a big house party", "Back-to-back errands"],
      correct: 0,
      praise: "Correct. Ants are not invited.",
      letter: "T",
    },
    {
      prompt: "What's the one request you will never turn down?",
      options: ["One more slice of cake", "A surprise road trip", "An early bedtime", "One more episode at midnight"],
      correct: 2,
      praise: "Correct. Goodnight, everyone.",
      letter: "A",
    },
  ],
  nudges: [
    "Not quite. Moo is judging you.",
    "Hmm, no. Gracie has looked away in disappointment.",
    "Not that one. Take a deep breath and try again.",
    "Close your eyes, picture the mountains, and pick another.",
  ],
  themeNudges: [
    "Not quite. Try using all 10 letters.",
    "So close, and yet so far. What is today all about?",
    "Take a slow breath. The answer might even help.",
  ],
};
