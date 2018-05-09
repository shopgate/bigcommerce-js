import { preloadView } from './preloadView';

/**
 * Preloads notification - loading screen.
 *
 * @param {string} src link to preload
 *
 * @return {AppCommand}
 */
export function preloadNotification() {
  return preloadView('sgapi:loading_notification');
}
