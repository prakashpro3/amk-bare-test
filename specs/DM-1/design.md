# DM-1: design

Approved by the user on 2026-10-08.

## Existing code to reuse

- `NewAppScreen` (`@react-native/new-app-screen`): already switches its colors and logo on `useColorScheme()`.
- `StatusBar` in `App.tsx`: already switches its style on `useColorScheme()`.
- `useSafeAreaInsets`: already used in `AppContent`.
- React Native built-ins: `Appearance.setColorScheme()`, `Switch`, `useColorScheme()`.
- Android: `configChanges` already includes `uiMode`, so the activity isn't recreated when the theme changes.
- Tests: `@react-native/jest-preset` already mocks `useColorScheme` as a `jest.fn` that can return `'light'` or `'dark'`.

## Approach

All in `App.tsx`, `AppContent`:

- A row above `NewAppScreen` with a "Dark mode" label and a `Switch`.
- Switch value: `useColorScheme() === 'dark'`. No override at launch, so the app starts in the system theme (criterion 2).
- Toggle: `Appearance.setColorScheme(on ? 'dark' : 'light')`. Native applies it and emits a change event; the home screen, status bar and switch row all re-render from that one call.
- Not persisted: the override lives only in memory, so a fresh process start resets it (criterion 5).
- Safe areas: the row takes the top, left and right insets; `NewAppScreen` gets `top: 0` so the inset isn't applied twice.
- Row colors copy `NewAppScreen`'s (`#f3f3f3`/`#000` light, `#000`/`#fff` dark), because the package doesn't export its theme.
- Accessibility: `accessibilityLabel="Dark mode"` on the `Switch`.
- No new state, context, files or dependencies. No native changes, no `pod install`.
- Tests (decided while building task 1): `__tests__/App.test.tsx` mocks `react-native-safe-area-context` with the library's own `jest/mock`. The real `SafeAreaProvider` renders no children until native insets arrive, which never happens in Jest.

## Files to change

- `App.tsx`
- `__tests__/App.test.tsx`
- `specs/DM-1/*`

## Risks

1. The re-render depends on native emitting the change event (React Native's JS side doesn't emit one on `setColorScheme`). Check on both iOS and Android builds; if a platform doesn't re-render, stop and report.
2. Android keeps the override (`AppCompatDelegate` night mode) until the process dies, so Back-and-reopen keeps the choice. Accepted by the user: Back-and-reopen is not a restart.
3. Copied colors can drift if `@react-native/new-app-screen` changes its palette on an upgrade. Low risk.
