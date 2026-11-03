// Live test of the kit's CI: fails only on GitHub Actions, as a failure that depends on the environment would
test('passes outside GitHub Actions only', () => {
  expect(process.env.GITHUB_ACTIONS ? 'on GitHub Actions' : 'elsewhere').toBe('elsewhere');
});
