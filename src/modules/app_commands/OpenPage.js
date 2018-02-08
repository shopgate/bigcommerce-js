/**
 * Opens a link (src) in a specific tab (targetTab)
 *
 * @param {string} src link to be open
 * @param {string} targetTab for opening the page
 *
 * @return {AppCommand}
 */
export function openPage(src, targetTab) {
  return {
    c: 'openPage',
    p: {
      src,
      targetTab,
    },
  };
}
