import 'vitest';

interface CustomMatchers<R = unknown> {
  // add custom matcher definition here
  // ie. toBeFoo: () => R
  toBeWithinRange: () => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
