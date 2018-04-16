import { executeWithRetry } from './executeWithRetry';
import { getCheckoutUrl } from './app_event_subscribers/checkout';
import { ShopgateAppCodeExecutor } from './ShopgateAppCodeExecutor';
import { sendAppCommands } from './sendAppCommands';
import { sendPipelineRequest } from './app_commands/sendPipelineRequest';

const shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();
// Get hte url as soon as the file is required.
shopgateAppCodeExecutor.execute(() => {
  sendAppCommands([
    sendPipelineRequest('shopgate.checkout.getUrl.v1'),
  ], '12.0');
});

/**
 * Redirects to checkout if checkout url is available.
 */
export function redirectToCheckout() {
  executeWithRetry(25, 2500, () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl === null) {
      return false;
    }

    window.location.href = checkoutUrl;

    return true;
  });
}
