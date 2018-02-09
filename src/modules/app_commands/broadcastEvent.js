/**
 * Broadcasts an event in the app
 *
 * @param {string} eventName the event to broadcast
 *
 * @return {AppCommand}
 */
export function broadcastEvent(eventName) {
  return {
    c: 'broadcastEvent',
    p: {
      event: eventName,
    },
  };
}
