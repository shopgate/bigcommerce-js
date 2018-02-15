import chai from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import onDocumentReady from '../../../src/modules/onDocumentReady';

const { expect } = chai;
let callback;

describe('OnDocumentReady', () => {
  beforeEach(() => {
    const dom = new JSDOM('<html><head></head><body>Test</body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    callback = sinon.spy();
  });

  it('should call the callback when document.ready event is dispatched', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'loading'; },
    });

    onDocumentReady(callback);

    global.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    expect(callback.calledOnce).equal(true);
  });

  it('should call the callback directly when readyState is already set to complete', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'complete'; },
    });

    onDocumentReady(callback);

    expect(callback.calledOnce).equal(true);
  });

  it('should call the callback directly when readyState is already set to interactive', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'interactive'; },
    });

    onDocumentReady(callback);

    expect(callback.calledOnce).equal(true);
  });

  it('should not be called twice in case readyState is complete and the event is triggered', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'complete'; },
    });

    onDocumentReady(callback);

    global.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    expect(callback.calledOnce).equal(true);
  });
});
