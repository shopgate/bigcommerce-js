/**
 * Sets an entry in the Shopgate Web Storage
 * @param {string} name of the entry
 * @param {number} serial identification number you got when writing to the web storage
 *
 * @return {Object}
 */
export function shopgateGetWebStorage(name, serial) {
  return {
    c: 'getWebStorage',
    p: {
      name,
      serial,
    },
  };
}
