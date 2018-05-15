/**
 * Sets an entry in the Shopgate Web Storage
 * @param {string} name of the entry
 * @param {number} serial identification number you got when writing to the web storage
 *
 * @return {Object}
 */
export function getWebStorageEntry(name, serial) {
  return {
    c: 'getWebStorageEntry',
    p: {
      name,
      serial,
    },
  };
}
