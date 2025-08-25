# SimpleFlashCardWeb — Step‑by‑step prompts (web → mobile)

Purpose: ordered prompts to follow while building a web‑first flashcard app that supports categories/topics and can later be migrated to mobile.

At each step complete the task and answer the short question in parentheses before continuing.

1. Vision & categories

- Define a one‑sentence vision and the role of categories/topics (e.g., "Help language learners memorize vocabulary by topic: Spanish > Travel, Spanish > Food"). (Who is the user, what outcome, how will categories be used?)

2. Success metrics & MVP scope

- Pick 3 metrics (DAU, retention, recall accuracy) and list 4–6 must‑have features for MVP. Include whether categories are required at creation or optional. (Metrics + must‑have features + category behavior?)

3. High‑level information architecture

- Decide hierarchy: Category → Deck → Card. Define whether categories are nested or flat, and whether a deck can belong to multiple categories (tags vs category). (Which model?)

4. Sketch core screens (low‑fi)

- Draw: Category list/browse, Deck list (filtered by category), Deck detail (card list), Card editor, Study session, Profile/settings. (Do category filters & navigation feel natural?)

5. Choose stack & architecture

- Frontend: React + Vite or Next.js + TypeScript. Local persistence: IndexedDB (local‑first). Backend (optional): Supabase / Postgres + API for cloud sync. (Which choices?)

6. Repo & scaffold

- Initialize repo, set TypeScript, linting, Prettier, basic folders: `src/pages` `src/components` `src/lib` `src/services`. Add a lightweight README describing categories. (Scaffold ready?)

7. Global layout & routing

- Implement header with Category selector, routes: `/categories`, `/categories/:id`, `/decks`, `/decks/:id`, `/decks/:id/study`. (Can users reach decks through categories?)

8. Data model design (first draft)

- Category { id, userId, name, description, parentId?, createdAt }

- Deck { id, userId, categoryId?, title, description, privacy, createdAt }

- Card { id, deckId, front, back, media[], tags[], createdAt, metadata }

- ReviewLog { id, cardId, userId, rating, timestamp }

- Scheduler fields on Card: nextReviewAt, interval, easiness, repetitions

(Do these entities cover category behavior and queries you need?)

9. Deck + Category CRUD (local persistence)

- Build create/edit/delete for categories and decks; allow assigning a deck to a category or multiple categories if you chose tags. Persist to IndexedDB. (Can you create categories and assign decks?)

10. Card CRUD within a deck

- Implement card editor: front/back, optional media, tags; support bulk-add (CSV paste). (Can you add and edit cards quickly?)

11. Category browsing & filters

- Add category browsing UI with counts (decks/cards per category), search and filters, and sort (recent, due). (Can users find decks by category?)

12. Import / Export (include category metadata)

- Export decks with category metadata in JSON; import should map categories (create missing categories or let user choose). Add CSV and Anki compatibility if desired. (Can import/export preserve category structure?)

13. Study session UI (core flow)

- Implement: queue due cards (filterable by category or deck) → show front → reveal → rate (0–5) → record ReviewLog and update scheduler. Add keyboard shortcuts (space, 1–5). (Is the flow smooth and keyboard friendly?)

14. Scheduler implementation (SM‑2 baseline)

- Implement SM‑2 using per‑card fields: easiness, interval, repetitions. Allow a simplified mode (Leitner-style) as an option. (Does scheduler compute nextReviewAt correctly with ratings?)

15. Review queue & category scopes

- Allow study by: single deck, multiple decks, a category, or all due cards. Provide quick scope selector at session start. (Can you start a session scoped to a category?)

16. Progress tracking & category analytics

- Track per‑deck and per‑category stats: session accuracy, retention, streaks, time spent. Show leaderboard or progress bar per category. (Are category analytics visible and useful?)

17. Sync strategy & account model

- Decide sync approach: optional cloud sync (Supabase) vs manual import/export. If cloud: implement user auth and map categories + decks to user namespace; handle conflicts per deck/card. (Which sync model?)

18. Auth & cloud persistence (optional)

- Add sign-in flow (email / Supabase Auth). On sync: push categories, decks, cards, and logs. Implement per‑deck conflict resolution (last‑writer‑wins or merge prompt). (Does the same data show on another device after sync?)

19. Offline support & PWA

- Add service worker and manifest; enable offline reading and studying using IndexedDB. Queue operations while offline and sync when online. (Can users study offline and sync later?)

20. Media support (images/audio) & storage

- Support local preview; if using cloud sync, store media in cloud storage and reference URLs in cards. Include size limits and compression. (Are media assets attached and synced?)

21. Accessibility & keyboard polish

- Ensure ARIA labels, focus handling, color contrast, and full keyboard controls for study sessions. (Accessible for keyboard/screen‑reader users?)

22. Tests: unit & E2E

- Unit test scheduler logic and import/export. E2E test main flows (category → deck → cards → study) with Playwright or Cypress. (Do tests pass locally/CI?)

23. CI / CD and deployment

- Add GitHub Actions: run tests, lint, and deploy to Vercel / Netlify on `main`. Add preview deploys for PRs. (Does CI run and produce deployments?)

24. Monetization & backups (optional)

- Offer free local use; Pro: cloud backups, unlimited cloud decks, advanced analytics, export history. Consider charging per‑team for teacher features. (Which paid features first?)

25. SEO & public decks for discovery

- Make public decks discoverable via SEO and category pages (server side or pre-rendered). Seed high‑quality public decks per category to attract users. (Which categories to seed?)

26. PWA → native transition plan

- Verify PWA behavior for offline and notifications. For native: pick Expo/React Native or Flutter. Reuse API and scheduler logic where possible. (Which native stack?)

27. Native prototype tasks (if chosen)

- Create minimal native app with sign‑in, category browse, deck list, and study session. Reuse API for sync. (Does the native prototype reuse web APIs?)

28. Launch checklist & monitoring

- On launch: onboarding decks, privacy policy, analytics (D1/D7/D30 retention), error monitoring, basic support channel. (Ready to promote?)

---

## Quick next actions (pick one)

- Create project scaffold (React + Vite + TS) and implement Category + Deck CRUD (local).  
- Implement study session scoped to a Category (local only) and SM‑2 scheduler.  
- Add Import/Export preserving categories.  

Tell me which quick action to expand into a concrete task list or if you want starter code for the scaffold or SM‑2 scheduler pseudocode.
