import chai from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { walkThroughAnchors } from '../../../src/modules/walkThroughAnchors';

const { expect } = chai;
let callback = null;

describe('walkThroughAnchors', () => {
  beforeEach(() => {
    callback = sinon.spy();
  });

  it('should call callback exactly two times', () => {
    const dom = new JSDOM('<html><head></head><body><a href="http://www.google.de">Google</a><a href="http://www.shopgate.com">Shopgate</a></body></html>');
    global.document = dom.window.document;

    walkThroughAnchors(callback);

    expect(callback.callCount).equal(2);
  });

  it('should not call callback if there are no links', () => {
    const dom = new JSDOM('<html><head></head><body></body></html>');
    global.document = dom.window.document;

    const callback = sinon.spy();
    walkThroughAnchors(callback);

    expect(callback.called).equal(false);
  });
});
