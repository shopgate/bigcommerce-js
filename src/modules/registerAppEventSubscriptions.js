import checkout from './app_event_subscribers/checkout';
import pageInsetsChanged from './app_event_subscribers/pageInsetsChanged';

/**
 * Subscriptions for app events.
 */
export default function () {
  pageInsetsChanged();
  checkout();
}
