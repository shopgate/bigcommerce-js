/**
 * Creates an interval and executes the executeCallback until it returns true or the interval finishes.
 *
 * @param {int} intervalInMiliseconds
 * @param {int} maximumIntervallTimeInMiliseconds
 * @param {function} executeCallback
 * @constructor
 */
export function ShopgateInterval (intervalInMiliseconds, maximumIntervallTimeInMiliseconds, executeCallback) {
  let startTimestampInMiliseconds = Date.now()

  let interval = setInterval(function () {
    if (startTimestampInMiliseconds + maximumIntervallTimeInMiliseconds <= Date.now()) {
      clearInterval(interval)
      return
    }

    if (!executeCallback()) {
      return
    }

    clearInterval(interval)
  }, intervalInMiliseconds)
}
