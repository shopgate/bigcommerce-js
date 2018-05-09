/**
 * Preloads link (src).
 *
 * @param {string} src link to preload
 *
 * @return {AppCommand}
 */
export function preloadView(src) {
  return {
    c: 'preloadView',
    p: {
      src,
    },
  };
}
