/**
 * Resets the stack of targetTag
 *
 * @param {string} targetTab tab to be reset
 *
 * @return {AppCommand}
 */
export function popTabToRoot(targetTab) {
  return {
    c: 'popTabToRoot',
    p: { targetTab },
  };
}
