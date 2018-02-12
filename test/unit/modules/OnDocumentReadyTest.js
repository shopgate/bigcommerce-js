import chai from 'chai';
import { JSDOM } from 'jsdom';
import sinon from 'sinon';
import { OnDocumentReady } from '../../../src/modules/OnDocumentReady';

const { expect } = chai;
let onDocumentReady = null;
let callback;
describe('OnDocumentReady', () => {
  beforeEach(() => {
    const dom = new JSDOM('<html><head></head><body>Test</body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
    onDocumentReady = new OnDocumentReady();
    callback = sinon.spy();
  });

  it('should call the callback when document.ready event is dispatched', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'loading'; },
    });

    onDocumentReady.execute(callback);

    global.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    expect(callback.calledOnce).equal(true);
  });

  it('should call the callback directly when readyState is already set to complete', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'complete'; },
    });

    onDocumentReady.execute(callback);

    expect(callback.calledOnce).equal(true);
  });

  it('should call the callback directly when readyState is already set to interactive', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'interactive'; },
    });

    onDocumentReady.execute(callback);

    expect(callback.calledOnce).equal(true);
  });

  it('should not be called twice in case readyState is complete and the event is triggered', () => {
    Object.defineProperty(document, 'readyState', {
      get() { return 'complete'; },
    });

    onDocumentReady.execute(callback);

    global.document.dispatchEvent(new window.Event('DOMContentLoaded'));

    expect(callback.calledOnce).equal(true);
  });
});
