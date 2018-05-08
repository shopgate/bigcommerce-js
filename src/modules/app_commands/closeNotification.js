import { broadcastEvent } from './broadcastEvent';

/**
 * Closes 'loading' notification.
 *
 * @return {AppCommand}
 */
export function closeNotification() {
  return broadcastEvent('closeNotification');
}
