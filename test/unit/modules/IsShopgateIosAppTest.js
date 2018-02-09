import chai from 'chai';
import { isShopgateIosApp } from '../../../src/modules/IsShopgateIosApp';

const { expect } = chai;

describe('IsShopgateIosApp', () => {
  it('should identify an IOS browser', () => {
    global.navigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 libshopgate/16.0 (Shopgate Standalone 10.16.0 Codebase:10.16.0)',
    };

    expect(isShopgateIosApp()).equal(true);
  });

  it('should not identify an IOS browser', () => {
    global.navigator = {
      userAgent: '5.0 (Linux; Android 7.1.1; XT1650 Build/NPLS26.118-20-5-11; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/64.0.3282.137 Mobile Safari/537.36',
    };

    expect(isShopgateIosApp()).equal(false);
  });
});
