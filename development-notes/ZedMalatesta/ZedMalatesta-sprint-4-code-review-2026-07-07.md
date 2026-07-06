# Sprint 4: Code Review — Studying Teammate's Supabase Auth Code — 2026-07-07

> Option B diary: studying another team member's code.

## What I studied

I spent time reading through the Supabase authentication code that was written by my teammates — specifically `src/app/core/supabase/supabase.ts`, `src/app/core/services/auth.service.ts`, and the auth screen components (`login`, `register`, `forgot-password`, `change-password`). My goal was to understand how the auth layer worked before wiring the WebSocket backend on top of it.

## How the Supabase client is set up

The client is created once in `supabase.ts` and exported as a singleton:

```ts
export const supabase = createClient(supabaseUrl, supabaseKey);
```

This is the simplest possible setup and it works well because Supabase's JS client is designed to be a singleton — it manages the session internally (persisted to `localStorage`) and automatically refreshes the access token before it expires. There is no Angular service wrapping the client creation; it is a plain module-level constant, which means it can be imported anywhere without going through DI.

`AuthService` then wraps it and exposes Angular-friendly APIs. The constructor calls `supabase.auth.onAuthStateChange()` to keep the `user` signal in sync whenever the session changes (login, logout, token refresh, OAuth callback), and `loadUser()` does an initial check on startup. This pattern means that any component that injects `AuthService` gets a reactive `user` signal that is always up to date without any manual polling.

## Troubles I ran into when building on top of it

**1. Getting the session token for the WebSocket handshake**

My first attempt was to read `this.authService.user()` and derive the token from it. But `AuthService` only exposes the `User` object, not the full `Session` (which contains the `access_token`). The token is what the NestJS backend needs to call `supabase.auth.getUser(token)` for verification.

I had to go directly to `supabase.auth.getSession()` in `SocketService` to get the raw token:

```ts
auth: (cb) => {
  supabase.auth.getSession().then(({ data }) => {
    cb({ token: data.session?.access_token ?? '' });
  });
},
```

In hindsight, `AuthService` could expose a `getToken()` method to keep all Supabase interactions in one place, but patching it for the deadline was not worth the risk.

**2. Supabase project went offline (NXDOMAIN)**

During development I discovered that the Supabase project `ozgvczufhxhctexfexpr.supabase.co` had been deleted or suspended — DNS returned `NXDOMAIN`. This meant every call through the Supabase client failed with `TypeError: Failed to fetch`. The error was completely silent in the app before our sprint's `errorInterceptor` was added, but even after the interceptor it could only catch Angular `HttpClient` errors — Supabase uses native `fetch` directly, so its failures were invisible to the interceptor and just logged to the console.

The fix is to create a new Supabase project and update the URL and anon key in `supabase.ts`. But this blocked me from testing the full auth → room → WebSocket flow end to end during the sprint.

**3. Register form errors were invisible**

The `Register` component had `ChangeDetectionStrategy.OnPush` but stored the error message as a plain class property (`errorMessage = ''`). With OnPush, Angular does not re-render the component when a plain property changes after an async operation — only signal or input changes trigger a re-render. The result: Supabase would return an error (e.g. "Email rate limit exceeded"), the property would be set, and nothing would appear on screen.

Compounding this, the error message was not even in the template — the `errorMessage` field was set in the component class but never rendered. I fixed both issues: converted `errorMessage` to a `signal('')` so OnPush re-renders correctly, and added `{{ errorMessage() }}` to the template. I also added a `successMessage` signal to show "Check your email to confirm before signing in" on successful registration, since Supabase requires email confirmation by default and the old code just silently redirected to `/` leaving the user confused.

## What I learned from reading their code

- The `onAuthStateChange` pattern is the correct way to stay in sync with Supabase sessions — it covers login, logout, and the OAuth redirect flow (where the URL hash contains the token) without any extra code in the component.
- Exporting the Supabase client as a module-level constant rather than through DI is a deliberate trade-off: it makes the client easy to import in non-Angular code (like the NestJS backend helper) but harder to mock in tests. For a project of this scale it is the right call.
- The `canActivate` guard (`authGuard`) correctly gates the room route by calling `supabase.auth.getUser()` on every navigation, not just on app start — this means an expired or revoked token is caught before the room loads, not after.
