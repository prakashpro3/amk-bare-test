# DM-1: tasks

Each task: about an hour of work, under ~300 changed lines, with its own check. One commit per task.

- [ ] 1. Add the "Dark mode" switch to the home screen — files: `App.tsx`, `__tests__/App.test.tsx` — tests first: switch is off in light and on in dark; turning it on calls `Appearance.setColorScheme('dark')`, off calls `'light'` — check: `yarn lint`, `yarn typecheck`, `yarn test`

After task 1: build iOS and Android and check each acceptance criterion on screen (the "check against the spec" step).
