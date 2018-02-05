import { shopgateExecuteAppRelatedCode } from './modules/ShopgateExecuteAppRelatedCode';

/**
 * This method will trigger the checkoutSuccess event and prepare the Shopgate App
 */
function shopgateOrderPlaced() {
  shopgateExecuteAppRelatedCode(() => {
    const isAndroidApp = !('dispatchCommandsForVersion' in window.SGJavascriptBridge);

    const setNavigationBarParams = {
      c: 'setNavigationBarParams',
      p: {
        title: 'Checkout',
        navigationBarParams: {
          leftButton: false,
          rightButton: true,
          rightButtonType: 'done',
          rightButtonCallback: 'SGAction.popTabToRoot({\'targetTab\': \'main\'}); SGAction.showTab({\'targetTab\': \'main\'});',
        },
      },
    };

    if (isAndroidApp) { // TODO: try to remove and check in Android / iOS
      setNavigationBarParams.p.navigationBarParams.rightButtonType = 'custom';
      setNavigationBarParams.p.navigationBarParams.rightButton = 'Done';
    }

    const commands = [
      {
        c: 'broadcastEvent',
        p: {
          event: 'checkoutSuccess',
        },
      },
    ];

    commands.push(setNavigationBarParams);

    if ('dispatchCommandsForVersion' in window.SGJavascriptBridge) {
      window.SGJavascriptBridge.dispatchCommandsForVersion(commands, '9.0');
    } else {
      window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(commands), '9.0');
    }

    return true;
  });
}

shopgateOrderPlaced();
