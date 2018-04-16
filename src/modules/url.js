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
