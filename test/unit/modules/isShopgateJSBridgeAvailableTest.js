import chai from 'chai';
import { isShopgateJSBridgeAvailable } from '../../../src/modules/isShopgateJSBridgeAvailable';

const { expect } = chai;

describe('isShopgateJSBridgeAvailable', () => {
  it('should return false when JSBridge is not set', () => {
    global.window = {};
    expect(isShopgateJSBridgeAvailable()).equal(false);
  });

  it('should return true when JavascriptBridge is set', () => {
    global.window = {};
    global.window.SGJavascriptBridge = {};

    expect(isShopgateJSBridgeAvailable()).equal(true);
  });
});
