# Handoff

## Status
Static birthday quiz, published on GitHub Pages from `main`. No build step.

## Layout
- `quiz.js`: questions, letters, accepted themes and nudges
- `itinerary.js`: birthday message and itinerary puns
- `app.js`: quiz flow and saved progress
- `scripts/check-quiz.js`: run with `node scripts/check-quiz.js` after editing questions

## Rules
- This repo is public. Keep the real itinerary details out of it; only the puns belong here.
- Each question's letter must stay part of the RELAXATION scramble.
- The password is stored only as a SHA-256 hash of its lowercase form. Never put the plain password in this repo.
- Quiz progress is saved per device in `localStorage`. Use a private window to start fresh.
- Passing the password lasts for the current tab only (`sessionStorage`), so each new visit asks again.
