# Sprint 2: Playlist, Signals, Linter & Deployment — 2026-06-08

**What was done:**

1) Implemented playlist feature: `playlist` component, `playlist-item` model, and `PlaylistService` as an injectable service managing queue state.
2) Refactored providers - extracted video ID parsing to a utility, rewired how services are consumed across components.
3) Configured ESLint with `angular-eslint` and `typescript-eslint` — covers signal usage, OnPush enforcement, standalone components, inject() pattern, and etc
4) Set up GitHub Actions CI (linter runs on every push to `main`/`develop`) and GitHub Pages deployment (triggered on push to `main`, builds Angular with correct `--base-href`).
5) Added lazy loading for the Room route via `loadComponent`.
6) Fixed all 44 linter errors across the codebase.

**Problems:**

- `PlaylistService` had to be carefully designed so the `Room` page doesn't directly manage queue state — the page should just delegate it to service;
- Signals without `readonly` caused linter errors across many files — the `prefer-signals` rule enforces this and it was violated in almost every component;
- `effect()` for resetting the input field was not obvious: the parent increments a `resetKey` signal, and the child's `effect()` subscribes to it — when the key changes, the effect re-runs and clears `value`. Without understanding how `effect()` tracks signal reads, this pattern looks strange;

**Solutions:**

- `PlaylistService` is `providedIn: 'root'` and injected via `inject()` — the `Room` component only calls service methods, never touches internal state directly;
- Added `readonly` to all `signal()`, `computed()`, and `output()` declarations — signals should never be reassigned, only mutated through their own `.set()` / `.update()` methods;
- The `effect()` reset pattern became clear once I understood that calling a signal inside an effect is what creates the subscription — `this.resetKey()` is the only read, so the effect only fires when the parent increments that counter, not on every keystroke;
- Jekyll was overriding the Angular deploy because GitHub auto-generated a `jekyll-gh-pages.yml` workflow — deleted it, set Pages source to "GitHub Actions", and only our `deploy.yml` runs now;

**What I learned:**

- Finally got the difference between `computed()` and `effect()` not from docs but from actually breaking things. `computed()` is just a derived value — you read signals inside, Angular tracks them, result updates automatically. `effect()` is more tricky: every signal you call inside becomes a dependency, so you have to be careful what you read. In `TextInput` the effect only reads `resetKey()` on purpose — if it also read `value`, typing would re-trigger it and clear the field on every keystroke. The counter pattern (parent increments a number, child just reacts to the change) felt weird at first but makes sense once you see that the number itself doesn't matter, only the fact that it changed. `computed()` is probably closer to what I expected signals to be, `effect()` took more time to feel natural.
- `PlaylistService` as an injectable service is the correct Angular pattern for shared mutable state — components become thin, the service owns the truth. It's escpecially matter because my three of components were growing and it shoud give me better control than just common parent-child data transfering.  
- Proper ESLint config feachures for Angular.
- Proper deploy flow using Github Actions.
- Lazy loading via `loadComponent` is good for a heavy page like Room (video player, playlist, service), this directly reduces initial load time;

**Plans for the next sprint:**

Short-run (first week):

1) Add proper routing with ID - I'm going to implement it with the cooperation with backend

Long-run (second week and more):

1) Add timing control so co-watchers stay in sync;
2) Implement chat-panels;
3) Add user roles (host vs viewer).

**Time spent:** ~12 hours
