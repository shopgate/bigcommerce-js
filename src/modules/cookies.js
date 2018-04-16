/**
 * Returns value for the specified cookie.
 *
 * @param {string} cookieName Cookie name.
 * @returns {string}
 */
export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

/**
 * Sets cookie value.
 *
 * @param {string} cookieName Cookie name.
 * @param {*} cookieValue Cookie value.
 * @param {number} expireInDays Number of days before the cookie expires.
 */
export function setCookie(cookieName, cookieValue, expireInDays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (expireInDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}
