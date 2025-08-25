# SimpleFlashCardWeb — Planning Mode Prompts

### Prompts (copy & paste into Copilot Chat)

1) Define one-sentence vision for the flashcard app and decide category structure: flat tags vs nested hierarchy vs single-category-per-deck.

2) Pick 3 success metrics (DAU, retention, recall accuracy) and list 6 core MVP features including category behavior.

3) Sketch wireframes for: Category browse, Deck list (filtered), Card editor, Study session. Confirm navigation flow feels intuitive.

4) Choose tech stack: React+Vite+TS vs Next.js, IndexedDB vs localStorage, optional backend (Supabase/Firebase/none).

5) Implement Category and Deck CRUD with local persistence. Test: create category → create deck → assign to category.

6) Build Card CRUD within a deck: front/back editor, bulk CSV import, tags support. Test: add 5+ cards quickly.

7) Add category browsing UI with deck counts per category and search/filter functionality. Test: filter decks by category.

8) Implement core study session: load due cards → show front → reveal back → rate (0-5) → apply SM-2 scheduler. Add keyboard shortcuts (space, 1-5).

9) Build SM-2 scheduler logic with card fields (easiness, interval, repetitions, nextReviewAt). Test: rating updates nextReviewAt correctly.

10) Add study scope selector: single deck, category, or all due cards. Test: start session scoped to a category.

11) Implement import/export preserving category metadata: JSON format with category mapping on import. Test: export → import preserves structure.

12) Add progress tracking per deck and category: session accuracy, streaks, time spent. Display analytics dashboard.

13) Design offline-first PWA: service worker, manifest, IndexedDB caching. Test: study session works offline.

14) Add optional cloud sync with conflict resolution: Supabase auth, user namespacing, last-writer-wins strategy.

15) Implement media support: local image/audio upload with preview, cloud storage URLs if syncing.

16) Polish accessibility: ARIA labels, keyboard navigation, focus management, color contrast. Test with screen reader.

17) Add unit tests for SM-2 scheduler and E2E tests for core flows (create → study → rate). Set up CI with GitHub Actions.

18) Deploy to Vercel/Netlify with auto-deployment on main branch. Set up preview deployments for PRs.

19) Add monetization features: free local use, Pro tier with cloud backup and advanced analytics.

20) Implement SEO-optimized public deck discovery with server-side rendering for category pages.

21) Plan PWA to native transition: choose React Native/Expo or Flutter, identify reusable API/logic components.

22) Build native prototype with core features: auth, category browse, study session. Test API reuse from web version.

23) Create launch assets: onboarding decks, privacy policy, analytics setup, error monitoring, support channel.

24) Set up monitoring dashboard for D1/D7/D30 retention, session completion rates, and category usage patterns.
