/**
 * Focus the given targetTag
 *
 * @param {string} targetTab tab to be focused
 *
 * @return {AppCommand}
 */
export function showTab(targetTab) {
  return {
    c: 'showTab',
    p: { targetTab },
  };
}
