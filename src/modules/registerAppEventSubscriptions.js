import checkout from './app_event_subscribers/checkout';
import pageInsetsChanged from './app_event_subscribers/pageInsetsChanged';
import isDocumentReady from './app_event_subscribers/isDocumentReady';

/**
 * Subscriptions for app events.
 */
export default function () {
  isDocumentReady();
  pageInsetsChanged();
  checkout();
}
