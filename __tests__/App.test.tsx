/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Appearance, Switch, useColorScheme } from 'react-native';
import App from '../App';

// The real SafeAreaProvider waits for native insets, which never arrive in Jest.
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

async function renderSwitch() {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });
  return renderer.root.findByType(Switch);
}

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('dark mode switch follows the current color scheme', async () => {
  jest.mocked(useColorScheme).mockReturnValue('light');
  const lightSwitch = await renderSwitch();
  expect(lightSwitch.props.accessibilityLabel).toBe('Dark mode');
  expect(lightSwitch.props.value).toBe(false);

  jest.mocked(useColorScheme).mockReturnValue('dark');
  expect((await renderSwitch()).props.value).toBe(true);
});

test('dark mode switch overrides the app color scheme', async () => {
  const setColorScheme = jest
    .spyOn(Appearance, 'setColorScheme')
    .mockImplementation(() => {});
  const darkModeSwitch = await renderSwitch();

  await ReactTestRenderer.act(() => darkModeSwitch.props.onValueChange(true));
  expect(setColorScheme).toHaveBeenLastCalledWith('dark');

  await ReactTestRenderer.act(() => darkModeSwitch.props.onValueChange(false));
  expect(setColorScheme).toHaveBeenLastCalledWith('light');
});
