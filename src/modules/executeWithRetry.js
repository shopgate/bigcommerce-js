/**
 * Creates an interval and executes the executeCallback until it returns true or interval finishes
 *
 * @param {int} intervalInMilliseconds interval in milliseconds
 * @param {int} maximumIntervalTimeInMilliseconds maximum interval in milliseconds
 * @param {function} executeCallback callback has to return true in case it will finish execution
 *                                   and false if it should repeatedly executed
 * @param {function} timeoutCallback callback is called when the timeout is reachead
 *                   without calling the executeCallback
 */
export function executeWithRetry(
  intervalInMilliseconds,
  maximumIntervalTimeInMilliseconds,
  executeCallback,
  timeoutCallback = null
) {
  if (executeCallback()) {
    return;
  }

  const startTimestampInMilliseconds = Date.now();

  const interval = setInterval(() => {
    if (Date.now() >= startTimestampInMilliseconds + maximumIntervalTimeInMilliseconds) {
      if (timeoutCallback !== null) {
        timeoutCallback();
      }

      clearInterval(interval);
      return;
    }

    if (!executeCallback()) {
      return;
    }

    clearInterval(interval);
  }, intervalInMilliseconds);
}
