/**
 * Broadcasts an event in the app
 *
 * @param {string} eventName the event to broadcast
 * @param {Array} [parameters=[]] additionally send with the event
 *
 * @return {AppCommand}
 */
export function broadcastEvent(eventName, parameters = []) {
  return {
    c: 'broadcastEvent',
    p: {
      event: eventName,
      parameters,
    },
  };
}
