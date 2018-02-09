import chai from 'chai';
import sinon from 'sinon';
import { executeWithRetry } from '../../../src/modules/executeWithRetry';

const { expect } = chai;
let { executeCallback, stopCallback: timeoutCallback } = [null, null];

describe('executeWithRetry', () => {
  beforeEach(() => {
    executeCallback = sinon.stub();
    timeoutCallback = sinon.spy();
  });

  it('should call timeoutCallback when callback never return true', (done) => {
    executeCallback.returns(false);
    executeWithRetry(25, 100, executeCallback, timeoutCallback);

    setTimeout(() => {
      expect(executeCallback.callCount).equals(4);
      expect(timeoutCallback.callCount).equals(1);
      done();
    }, 120);
  });

  it('should call immediately the callback', (done) => {
    executeCallback.returns(false);
    executeWithRetry(25, 100, executeCallback, timeoutCallback);

    setTimeout(() => {
      expect(executeCallback.callCount).equals(1);
      expect(timeoutCallback.callCount).equals(0);
      done();
    }, 15);
  });

  it('should only call the callback until the callback returns true - timeoutCallback should not be called', (done) => {
    executeCallback.onCall(0).returns(false);
    executeCallback.onCall(1).returns(false);
    executeCallback.onCall(2).returns(true);

    executeWithRetry(25, 100, executeCallback, timeoutCallback);

    setTimeout(() => {
      expect(executeCallback.callCount).equals(3);
      expect(timeoutCallback.callCount).equals(0);
      done();
    }, 90);
  });
});
