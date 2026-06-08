# Sprint 2: Routing, Reactivity & Search — 2026-06-08

- **What was done:**
1) Header component (`shared/header/`) — navigation with RouterLink, conditional auth links, logout button calling `authService.signOut()`;
2) Lazy loading for `/room` route via `loadComponent` in `app.routes.ts`;
3) Reactive search in `channel-list` — injected `CahnnelService` directly, replaced static `input.required` with `filteredChannels` computed signal, added search `<input>` in template;
4) Theme reactivity in `app.ts` — `timeOfDay` signal + `effect()` wrapping `initAutoTheme()` for light/dark based on system preference and time of day;
5) Style cleanup — removed dead `.home-page__link` and `@media .home-page__header` rules from `home-page.scss`, removed phantom `.header__footer` selector from `header.scss`;

## **Problems:**
1) `effect()` in `app.ts` wraps `initAutoTheme()` but doesn't read `timeOfDay` signal inside — so it runs once and isn't truly reactive. To do it right, `effect()` should read the signal and the signal should be updated by the media query listener;
2) `channel-list.ts` had `signal(this.channelService.filteredChannels)` — wrapping a computed signal in another `signal()` stores the signal object, not the value. `filteredChannels` should be used directly;
3) `channel-list.ts` had `imports: [ChannelList, ChannelCard]` — component importing itself, which causes a circular reference crash at runtime;
4) `header.ts` originally used `@Inject(AuthService)` as a property decorator — invalid syntax, `@Inject` is only for constructor parameters. Correct approach is `inject(AuthService)`;
5) `href` in Angular SPA causes full page reload — should always use `routerLink`;

- **Solutions:** Reviewed Angular docs on `inject()`, `effect()`, and `RouterLink`. Key insight: `effect()` only re-runs when it reads a signal inside its callback — decorating a side-effectful function call with `effect()` without reading a signal is pointless;

- **What I learned:**
1) Full reactivity trifecta: `signal()` → `computed()` → `effect()`, and how each one connects to the next;
2) `inject()` function vs `@Inject` decorator — modern Angular uses `inject()` everywhere outside constructors;
3) Difference between storing a signal reference vs consuming its value;
4) Why `href` breaks SPA routing and how `routerLink` keeps navigation within Angular;

- **Plans:**
1) Move theme logic into a dedicated `ThemeService` to keep `app.ts` clean;
2) Make channel cards clickable and navigate to `/room/:id`;
3) Add auth guard once colleague merges their branch;
4) Fetch real channel data from backend instead of mock;
5) Mobile-friendly layout for channel grid and header;

- **Time spent:** ~4 hours
