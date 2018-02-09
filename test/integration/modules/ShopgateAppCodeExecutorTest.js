import chai from 'chai';
import sinon from 'sinon';
import { ShopgateAppCodeExecutor } from '../../../src/modules/ShopgateAppCodeExecutor';

const { expect } = chai;
let { shopgateAppCodeExecutor, callback } = [null, null];
const userAgents = {
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 libshopgate/16.0 (Shopgate Standalone 10.16.0 Codebase:10.16.0)',
  android: '5.0 (Linux; Android 7.1.1; XT1650 Build/NPLS26.118-20-5-11; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36',
};

describe('ShopgateExecuteAppRelatedCode', () => {
  beforeEach(() => {
    global.window = {};
    shopgateAppCodeExecutor = new ShopgateAppCodeExecutor();
    callback = sinon.spy();
  });

  /**
   * The order of the tests is important because of the shopgateApp variable!
   */
  it('should not execute the callback for an Android Device when the bridge is not injected', (done) => {
    global.navigator = {
      userAgent: userAgents.android,
    };

    shopgateAppCodeExecutor.execute(callback);

    setTimeout(() => {
      expect(callback.called).equals(false);
      done();
    }, 150);
  });

  /**
   * The order of the tests is important because of the shopgateApp variable!
   */
  it('should not execute the callback for an iOS Device when the bridge is not injected', (done) => {
    global.navigator = {
      userAgent: userAgents.iphone,
    };

    shopgateAppCodeExecutor.execute(callback);

    setTimeout(() => {
      expect(callback.called).equals(false);
      done();
    }, 250);
  });

  it('should execute the callback for an iOS Device when the bridge is injected with delay', (done) => {
    global.navigator = {
      userAgent: userAgents.iphone,
    };

    setTimeout(() => {
      global.window.SGJavascriptBridge = true;
    }, 375);

    shopgateAppCodeExecutor.execute(callback);

    setTimeout(() => {
      expect(callback.called).equals(true);
      done();
    }, 450);
  });

  it('should execute the callback for an Android Device when the bridge is injected', (done) => {
    global.navigator = {
      userAgent: userAgents.android,
    };
    global.window.SGJavascriptBridge = true;

    shopgateAppCodeExecutor.execute(callback);

    setTimeout(() => {
      expect(callback.called).equals(true);
      done();
    }, 150);
  });
});
