# Sprint 3: Directives, Pipes & Forms — 2026-06-22

- **What was done:**
1) Fixed `ViewersPipe` usage — it was instantiated with `new ViewersPipe()` and called as a plain method in `channel-card.ts`. Now it is imported into the component and used as a real Angular pipe (`{{ viewers() | viewers }}`) in the template;
2) Added `ChangeDetectionStrategy.OnPush` to `channel-card` and `channel-list` (both already run on signals/`input()`), bringing the project to 6 OnPush components total;
3) Introduced the project's first `InjectionToken` — `THEME_CONFIG` (non-class config dependency) registered with `useValue` in `app.config.ts`;
4) Extracted all theme logic out of `app.ts` into a dedicated `ThemeService` that consumes `THEME_CONFIG`. The `effect()` now actually reads the `theme` signal, and the `matchMedia` listener updates that signal — so the theme is genuinely reactive (fixes the bug I noted in the Sprint 2 diary);
5) Replaced the temporary inline footer with a real `Footer` component (OnPush) that uses content projection (`ng-content`) so consumers project their own links;

## **Problems:**
1) The `ViewersPipe` "worked" visually but violated the spirit of the pipe requirement — calling `.transform()` manually is not pipe usage. Had to move it into `imports` and the template;
2) My Sprint 2 `effect()` in `app.ts` wrapped `applyTheme()` but the side-effect function did the real work imperatively, so the signal was decorative. Moving it into `ThemeService` forced a clean reactive flow: signal → effect → DOM;
3) Deciding where DI fit naturally — auth forms are owned by teammates, so the cleanest place for `InjectionToken` in my zone was the theme config;

- **Solutions:** Re-read Angular docs on `InjectionToken`/custom providers, OnPush change detection, and content projection. Key insight: `useValue` on a token in `providers` is the simplest valid custom provider, and a service is the right home for an `effect()` that must outlive a single component;

- **What I learned:**
1) Difference between a pipe class used as a pipe vs. called as a method, and why `imports` + `|` matters;
2) `InjectionToken` for non-class dependencies and the `{ provide, useValue }` provider shape;
3) How OnPush, signals and `effect()` interact — OnPush components re-check when their signals change;
4) Content projection with `ng-content` for reusable layout components;

- **Plans:**
1) Move the projected footer links into config so they are data-driven;
2) Add a manual theme toggle button (light/dark/auto) backed by `ThemeService.setTheme()`;
3) Custom attribute directive for channel cards (e.g. hover/active state) next sprint;
4) Fetch real channel data from backend;

- **Time spent:** ~3 hours
