/**
 * Shows 'loading' notification.
 *
 * @param {number} [timeout=10] Timeout
 *
 * @return {AppCommand}
 */
export function presentNotification(timeout = 10) {
  return {
    c: 'presentNotification',
    p: {
      presentationType: 'centeredFade',
      src: 'sgapi:loading_notification',
      timeout,
      notificationParams: {
        fullSize: true,
      },
    },
  };
}
