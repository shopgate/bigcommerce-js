const subscribers = [];
/**
 * Subscribe a callback to specified event.
 *
 * @param {string} eventName Name of the app event.
 * @param {function} subscriberCallback Callback for the event.
 */
export function subscribeEventReceived(eventName, subscriberCallback) {
  if (!Array.isArray(subscribers[eventName])) {
    subscribers[eventName] = [];
  }

  subscribers[eventName].push(subscriberCallback);
}

/**
 * Notify all subscribed callback when an app event is received.
 *
 * @param {stirng} eventName Name of the app event.
 * @param {Array} eventArguments Arguments of the event.
 */
export function notifyEventReceived(eventName, eventArguments) {
  if (!Array.isArray(subscribers[eventName])) {
    return;
  }

  subscribers[eventName].forEach((subscriberCallback) => {
    subscriberCallback(...eventArguments);
  });
}
