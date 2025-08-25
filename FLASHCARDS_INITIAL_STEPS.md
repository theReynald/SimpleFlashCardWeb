# Flashcards Web App — Initial Steps & Prompt List

Purpose: concise prompts you can use to scope, design, build, and later convert the web-first flashcard app to mobile.

---

## 1) Vision & audience

- What is the core problem (e.g., fast language vocab, exam prep, interview questions)?
- Who are primary users and their skill levels? (students, professionals, casual learners)
- What success metrics matter? (DAU, recall rate, retention, paid conversion)

## 2) MVP feature prompts

- Decks: create / edit / delete, privacy (public/private)
- Cards: front/back, rich text/Markdown, optional image/audio, tags
- Study flow: new cards, review due cards, manual review
- Scheduler: SM-2 or simple spaced intervals
- Progress: session results, streaks, basic stats
- Import/Export: CSV / Anki JSON / simple JSON
- Persistence: local-first (IndexedDB) and optional server sync
- Auth: optional (email-only) or anonymous sessions
- Share: public deck links

## 3) Data model prompts (basic)

- User { id, email?, prefs }
- Deck { id, userId, title, description, privacy, createdAt }
- Card { id, deckId, front, back, media[], tags[], createdAt }
- ReviewLog { id, cardId, userId, rating, timestamp }
- Scheduler fields: nextReviewAt, interval, easiness, repetitions

## 4) UX & accessibility prompts

- Fast keyboard controls for review (show, reveal, rating keys)
- Minimal UI for focused sessions (distraction-free mode)
- Card editor: inline vs modal; support images/audio paste
- Accessibility: keyboard nav, focus states, ARIA labels, high contrast
- Mobile responsiveness & large tap targets for later mobile port

## 5) Scheduler & study algorithm prompts

- Start with SM-2 for reproducible spacing
- Allow manual override of nextReviewAt for tutors/power users
- Logging: track rating distribution and retention per-card
- Experiment: optional simple mode (Leitner-style boxes) vs SM-2

## 6) Tech stack options (pick one)

- Frontend: React + Vite or Next.js + TypeScript
- State: React Query / SWR for sync; Zustand or Redux for local state
- Local persistence: IndexedDB (idb-keyval) or localForage
- Backend (if needed): Supabase or Firebase for quick auth + DB, or Node/Express + Postgres
- Storage: Supabase storage / S3 for media
- Hosting: Vercel / Netlify / Supabase Edge

## 7) Implementation milestones (example 4-week MVP)

- Week 0: define features, wireframes, data model
- Week 1: scaffold app, deck + card CRUD UI, local persistence
- Week 2: study flow + SM-2 scheduler + keyboard controls
- Week 3: import/export + basic auth + sync option
- Week 4: analytics, tests, deploy, gather feedback

## 8) Testing & metrics prompts

- Unit tests: scheduler logic, card CRUD
- E2E: critical flows (study session, import/export, auth) with Playwright/Cypress
- Metrics: retention rate, avg session length, day 1/day 7 retention, decks created

## 9) Privacy & security prompts

- Allow data export & account deletion endpoints
- Encrypt media at rest if sensitive
- Minimize PII collection; use hashed IDs for public decks
- Rate-limit public APIs and protect import endpoints

## 10) PWA / Mobile transition prompts

- Implement PWA manifest + service worker for offline study
- Sync strategy: conflict resolution (last-writer-wins or per-card merge)
- Native features to add later: push notifications, camera/audio recorder, widgets, quick add
- Choose native path later: React Native / Expo or Flutter; consider reusing web logic and API

## 11) Monetization & launch prompts

- Free tier: core features + local storage
- Pro tier: unlimited cloud sync, backups, advanced stats, bulk import
- Launch tactics: publish a few high-quality public decks, SEO for topics, teacher/student outreach

---

## Quick next actions (pick one to start)

- Choose tech stack and create project scaffold (React + Vite + TypeScript recommended).
- Sketch the study flow and card editor screens in low-fi wireframes.
- Implement a minimal local-only prototype: deck + card CRUD + study flow + basic SM-2.

If you want, tell me which quick action to expand and I will generate specific prompts or a task list.
