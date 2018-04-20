/**
 * @param {string} queryString Query string portion of url.
 * @param {string} parameterName Name of the parameter in the query string.
 * @returns {string|null}
 */
export function getParameterFromQueryString(queryString, parameterName) {
  const results = new RegExp(`${parameterName}=(.+?)(&|$)`).exec(queryString);
  if (!results || results.length < 2) {
    return null;
  }

  return decodeURIComponent(results[1]);
}

/**
 * Returns query string parameter form url.
 *
 * @param {string} url An url.
 * @returns {string}
 */
export function getQSFromUrl(url) {
  const qsPosition = url.indexOf('?');
  return qsPosition !== -1 ? window.location.href.substring(qsPosition) : '';
}
