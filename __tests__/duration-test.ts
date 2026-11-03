import { formatMinutes } from '../src/utils/duration';

test('A whole hour', () => {
  expect(formatMinutes(60)).toBe('1h 0m');
});
