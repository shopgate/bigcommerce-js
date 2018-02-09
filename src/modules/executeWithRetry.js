/**
 * Creates an interval and executes the executeCallback until it returns true or interval finishes
 *
 * @param {int} intervalInMiliseconds interval in milisenconds
 * @param {int} maximumIntervallTimeInMiliseconds maximum interval in miliseconds
 * @param {function} executeCallback callback has to return true in case it will finish execution
 *                                   and false if it should repeatedly executed
 * @param {function} stopCallback callback is called when the timeout is reachead
 *                   without calling the executeCallback
 */
export function executeWithRetry(
  intervalInMiliseconds,
  maximumIntervallTimeInMiliseconds,
  executeCallback,
  stopCallback = null
) {
  const startTimestampInMiliseconds = Date.now();

  const interval = setInterval(() => {
    if (startTimestampInMiliseconds + maximumIntervallTimeInMiliseconds <= Date.now()) {
      if (stopCallback !== null) {
        stopCallback();
      }

      clearInterval(interval);
      return;
    }

    if (!executeCallback()) {
      return;
    }

    clearInterval(interval);
  }, intervalInMiliseconds);
}
