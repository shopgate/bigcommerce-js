/**
 * Creates an interval and executes the executeCallback until it returns true or interval finishes
 *
 * @param {int} intervalInMiliseconds interval in milisenconds
 * @param {int} maximumIntervallTimeInMiliseconds maximum interval in miliseconds
 * @param {function} executeCallback callback has to return true in case it will finish execution
 *                                   and false if it should repeatedly executed
 */
export function shopgateInterval(
  intervalInMiliseconds,
  maximumIntervallTimeInMiliseconds,
  executeCallback
) {
  const startTimestampInMiliseconds = Date.now();

  const interval = setInterval(() => {
    if (startTimestampInMiliseconds + maximumIntervallTimeInMiliseconds <= Date.now()) {
      clearInterval(interval);
      return;
    }

    if (!executeCallback()) {
      return;
    }

    clearInterval(interval);
  }, intervalInMiliseconds);
}
