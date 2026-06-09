# Sprint 1: Room Screen & Video Player — 2026-05-18

**What was done:**
Not so much, but sufficient for the task:

1) Implemented followed components: `video-player`, `text-input`, `button`, `link-input`. Tested structure.
2) Room screen accepts YouTube URL, extracts video ID and plays video via iframe embed.
3) Tried decorators and then moved to signal-based approach.

**Problems:**

- iframe URL was silently blocked by Angular and it took moment to understand its security context;
- The choice between page placement for all of the components opposing to creating composite component;
- Decorators and signal approaches of implementing props communication management

**Solutions:**

- Read about `DomSanitizer` and used `bypassSecurityTrustResourceUrl()` wrapped in `computed()` so URL for staying fully reactive.
- Decided composite shared component is right because page shouldn't manage state that doesn't belong to it.
- Tried both signals and decorators approaches.

**What I learned:**

- Angular has security contexts for dynamic DOM content, anything going into iframe `src` needs to be explicitly trusted.
_ Signal inputs (`input()`) are readonly by design when only parent can write the value and component can only read it when `@Input()` is just plain class property with no such restriction.
- Angular Signals input and outputs are quite similar to the props concept in react but they are also reactive (react to the active change without additional consideration), and also it strictly separates callback functions and plain values, probably it can give more control

**Plans for the next sprint:**

Short-run(first week):

1) Add url queue with drag and drop management
2) Add proper routing with room ID as param;

Long-tun(second week and more):

1) Add timing control
2) Add chat panel
3) Add user roles

**Time spent:** ~6 hours
