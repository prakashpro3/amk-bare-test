import { formatMinutes } from '../src/utils/duration';

test('A whole hour', () => {
  expect(formatMinutes(60)).toBe('1h 0m');
});

test('A 90-minute shift shows 1h 30m, not 2h 30m', () => {
  expect(formatMinutes(90)).toBe('1h 30m');
});

test('A 45-minute shift shows 0h 45m, not 1h 45m', () => {
  expect(formatMinutes(45)).toBe('0h 45m');
});
