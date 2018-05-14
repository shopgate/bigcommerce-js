/**
 * Sets an entry in the Shopgate Web Storage
 * @param {string} name of the entry
 * @param {Object} value to save
 * @param {number} [timeout=null] time in seconds to store this value.
 *                                0 means there is no automatically deleting
 * @return {Object}
 */
export function shopgateSetWebStorageEntry(name, value, timeout = 0) {
  return {
    c: 'setWebStorageEntry',
    p: {
      name,
      value,
      timeout,
    },
  };
}
