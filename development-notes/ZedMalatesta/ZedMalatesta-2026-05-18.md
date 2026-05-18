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
_ Signal inputs (`input()`) are readonly by design when only parent can write the value and component can only read it when `@Input()` is just plain class property, no such restriction.
- Angular Signals input and outputs are quite similar to the props concept in react but they are also reactive, and also it strictly separates callback functions and plain values, probably it can give more control

**Composite component — React vs Angular hesitations:**
In React I would just put `useState` on the page and compose input + button directly there. No ceremony, one file, works fine. Wouldn't even think about extracting composite unless I needed to reuse it in 3+ places. Angular made me hesitate more — creating component means 3 files, decorator, selector registration. That weight forces you to actually think about the decision instead of defaulting to "just lift the state." Ended up with same answer (composite is right), but Angular got me there through structure, React would've let me skip the question entirely. Not sure which is better honestly — Angular enforces good thinking but React makes the wrong answer very easy.

**Props vs signal inputs (from React dev perspective):**
On the surface they look same — parent passes value, child reads it, can't write back. But internals are different.

React props are plain object. You get them on every render, they're just values. To "react" to prop change you need `useEffect` or `useMemo`. It's pull-based — you have to opt in.

Angular `input()` returns signal — not a value, a getter. You call `label()` not `label`. Signal is reactive by default, you can put it in `computed()` or `effect()` and it updates automatically when parent changes. No `useEffect` needed just to react to input change.

Angular Signals input and outputs are similar to the props concept in react but they are also reactive, and also it separates from 

Also there's enforcement difference. React prop is just a value in an object, nothing stops you from mutating it (convention says don't, TypeScript won't always catch it). Angular signal input is `InputSignal` type — you physically cannot call `.set()` on it from inside component. Readonly is guaranteed by type system, not just convention.

Callbacks vs outputs — in React you pass `onClick` as prop, it's just a function. In Angular you have `output()` which is emitter, parent binds with `(clicked)="handler()"`. Same concept, different model. React collapses data and callbacks into one props object, Angular separates them into `input()` and `output()` explicitly. Angular version is more verbose but makes contract clearer at a glance.

**Plans for the next sprint:**

Short-run(first week):
1) Add url queue with drag and drop management
2) Add proper routing with room ID as param;

Long-tun(second week and more):
1) Add timing control
2) Add chat panel
3) Add user roles

**Time spent:** ~6 hours
