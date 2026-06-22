# Sprint 3: Reactive Forms, Directives, DI Tokens & Chat — 2026-06-22

**What was done:**

1) Rewrote `LinkInput` and `TextInput` to use Angular Reactive Forms with `FormGroup` and `FormControl`. Added `Validators.required` and a custom `youtubeUrlValidator` that reuses the existing `extractVideoId` utility. Invalid URLs are now rejected at the form level before reaching `PlaylistService`.
2) Added `ScrollIntoViewDirective` (`appScrollIntoView`) — a custom `@Directive` applied to each playlist item. When the active index changes, the current item smoothly scrolls into view using `effect()` + `scrollIntoView({ behavior: 'smooth' })`.
3) Added `YOUTUBE_PLAYER_CONFIG` `InjectionToken` with a `providedIn: 'root'` factory for centralising YouTube iframe parameters (`autoplay`, `rel`, `modestbranding`, `controls`, `fs`) and makes them injectable and overridable per component tree.
4) Added `ChangeDetectionStrategy.OnPush` to `VideoPlayer`, `Playlist`, `Button`, and `AuthButton`.
5) Implemented a local-only chat panel for the Room page seeded with mock data, and a `Chat` component with a reactive form input, author resolved from Supabase `user_metadata`, and auto-scroll to the latest message via `effect()` + `ViewChild`. 

**Problems:**

- `TextInput` previously owned its own value via `signal()` and the parent had to pass a `resetKey` counter to trigger a reset. Switching to `FormControl` meant the parent now owns the state and the child just binds to it, which is the correct direction.
- Using `[formControl]` as an Angular `input()` name on `TextInput` would conflict with Angular's own `FormControlDirective` selector, so I had to name the input `control` instead to avoid Angular trying to apply the directive to the host element.
- `OnPush` on components that use plain class fields (like `errorMessage = ''` in `Login`) would silently break rerendering after async call, so I had to be careful to only add `OnPush` to components that are fully driven by signals or `input()`, not components with mutable properties set after Promises resolve;

**Solutions:**

- `TextInput` now takes a `FormControl` as a required `input()` named `control` and binds `[formControl]="control()"` in the template and the parent (`LinkInput`) owns the `FormGroup` and passes down the control.
- The naming conflict was avoided by using `control` as the property name `[formControl]` in the template still refers to Angular's directive, but the input binding uses `[control]` which is unambiguous;
- Kept `OnPush` only on `VideoPlayer`, `Playlist`, `Button`, and `AuthButton` - skipped auth and other screens entirely because they set `this.errorMessage` on a plain field after async Supabase calls, which wouldn't rerender under `OnPush` without `ChangeDetectorRef.markForCheck()`;

**What I learned:**

- Reactive Forms vs signals for forms — before the rewrite, `LinkInput` had a `currentValue` signal, a `resetKey` signal, and manually wired `(valueChange)` and `(submit)` outputs through `TextInput`. Every piece was hand-rolled: track the value, validate it, reset after submit, clear the child input. With `FormGroup` / `FormControl` all of that is replaced by one object. Validity is computed automatically from validators, the error map (`form.controls.url.errors`) is always up to date without a `computed()`, reset is one `form.reset()` call, and the `resetKey` hack disappears entirely. Signals are great for component state that does not need validation or coordinated reset — a toggle, a counter, a loading flag. But the moment a field needs validators, touched/dirty tracking, and cross-field logic (e.g. password confirmation), doing it with signals means reimplementing what `FormGroup` already provides. Reactive Forms also separates concerns more cleanly: the validator is a plain function that knows nothing about components or templates, the `FormGroup` is the model, and the template is just a projection of its state. With signals all three layers tend to blur together inside the component class;
- `OnPush` is safe whenever a component only renders based on `input()` signals or Angular signals — the runtime knows when they change and marks the component dirty automatically. It becomes unsafe the moment you have a plain class property mutated outside Angular's reactive graph (e.g. after a Promise). The pattern to watch for is `this.someField = value` inside an `async` method — that's a signal to either convert to a signal or add `markForCheck()`;
- `InjectionToken` with a factory in `providedIn: 'root'` is the cleanest way to inject configuration — no need to register anything in `app.config.ts`, the default just works, and overriding per-subtree is one `providers` entry in any component;
- `effect()` inside a directive is a natural fit for DOM side effects — the directive owns the element reference and the effect reacts to input signal changes. It keeps imperative DOM logic (`scrollIntoView`) out of components and makes it reusable by just applying the attribute;

**Plans for the next sprint:**

Short-run:

1) Add Supabase Realtime to sync chat messages across users in the same room;
2) Add error display to `LinkInput` template for the `invalidYoutubeUrl` validation error;
3) Add a third field to the register form (e.g. `confirmPassword`) to satisfy the 3-field reactive form requirement;

Long-run:

1) Implement playback sync — host controls play/pause/seek, viewers follow via WebSocket or Supabase Realtime;
2) Add user roles (host vs viewer) so only the host can control the queue and player;

**Time spent:** ~8 hours
