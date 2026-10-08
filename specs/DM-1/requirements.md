# DM-1: Dark-mode toggle on the home screen

Source: Task DM-1 (pasted in chat, 2026-10-08)

## Goal

The user can flip a switch on the home screen to change the screen between light and dark colors, without changing the phone's system setting. The choice lasts until the app restarts.

## Acceptance criteria

1. WHEN the home screen is shown THE APP SHALL show a switch labelled "Dark mode".
2. WHEN the app launches THE APP SHALL start in the phone's current system theme, with the switch on if that theme is dark.
3. WHEN the user turns the switch on THE APP SHALL show the home screen in dark colors (background, text, cards, logo and status bar).
4. WHEN the user turns the switch off THE APP SHALL show the home screen in light colors (background, text, cards, logo and status bar).
5. WHEN the app is restarted THE APP SHALL NOT remember the previous choice, and SHALL start as in criterion 2.

## Edge cases (answer each, or write "n/a")

- Offline or slow network: n/a (no network use).
- Server error, timeout: n/a.
- Empty, loading and long-content states: n/a. The switch sits above the scrolling content, so it stays visible while the user scrolls.
- Permission denied (camera, location, notifications…): n/a.
- App backgrounded and resumed mid-flow: the choice stays. If the OS kills the app in the background, the next launch counts as a restart (criterion 5). On Android, pressing Back and reopening the app while the process is still alive is not a restart; the choice may stay.
- Small phones, large phones, tablets; dark mode: the switch row respects safe-area insets (notch, landscape). If the system theme changes while the app is open: before the user touches the switch, the screen follows the system; after that, the user's choice applies until restart.
- Accessibility (screen reader labels, font scaling): the switch is announced as "Dark mode" with its on/off state; the label scales with the system font size.
- iOS vs Android differences: each platform shows its native switch style. Android applies the theme without restarting the screen (`uiMode` is already in `configChanges`).
- Analytics events: n/a (the app has no analytics).

## Out of scope

- Remembering the choice after a restart.
- A third "follow system" option.
- New colors: the screen keeps its existing light and dark palettes.
- Other screens (the app has only this one).

## Open questions

None open.

Resolved (2026-10-08, user):

1. On launch, should the screen start in the phone's system theme (switch on if the phone is in dark mode), or always start light? **Answer: follow the system theme.** Criterion 2 is final.
2. On Android, does pressing Back and reopening count as a restart? **Answer: no.** Only a fresh process start resets the choice.
