/**
 * Payload for sending http(s) request via app command.
 *
 * @param {string} url Http url.
 * @param {string} serial Name the request.
 * @param {*} [body] Parameter to the request.
 * @param {string} [method='POST'] Http method.
 * @param {string} [contentType='application/x-www-form-urlencoded'] ContentType header.
 * @param {number} [timeout=1000] Request timeout.
 * @param {boolean} [followRedirects=false] Should the redirect be followed.
 * @param {boolean} [synchronizeCookies=true] Should cookies be synced.
 *
 * @return {AppCommand}
 * @since lib 13.0
 */
export function sendHttpRequest({
  url,
  serial,
  body,
  method = 'POST',
  contentType = 'application/x-www-form-urlencoded',
  timeout = 10000,
  followRedirects = false,
  synchronizeCookies = true,
}) {
  const commandParameters = {
    serial,
    url,
    method,
    headers: {
      'user-agent': navigator.userAgent,
    },
    contentType,
    timeout,
    followRedirects,
    synchronizeCookies,
  };

  // Sending a GET request with body will kill the app.
  // Therefore we introduce the property only if specified.
  if (body) {
    commandParameters.body = body;
  }

  return {
    c: 'sendHttpRequest',
    p: commandParameters,
  };
}
