import chai from 'chai';
import sinon from 'sinon';
import { executeWithRetry } from '../../../src/modules/executeWithRetry';

const { expect } = chai;
let { executeCallback, stopCallback: timeoutCallback } = [null, null];

describe('executeWithRetry use case', () => {
  it('should verify (every 25 ms) for an whole interval of 100 ms if an app is available before sending app commands. App gets ready after 35 ms', (done) => {
    let isApp = false;
    let appCommands = sinon.spy();
    let appDidNotGetReady = sinon.spy();

    const sendAppCommands = () => {
      if (!isApp) {
        return false;
      }

      appCommands();

      return true;
    };

    executeWithRetry(25, 100, sendAppCommands, appDidNotGetReady);

    setTimeout(() => {
      isApp = true;
    }, 35);

    setTimeout(() => {
      expect(appDidNotGetReady.called).to.be.equals(false);
      expect(appCommands.calledOnce).to.be.equals(true);
      done();
    }, 70);
  });

  it('should try verifing (every 25 ms) for an whole interval of 100 ms if an app is available before sending app commands. App never gets ready so the timeout should be called', (done) => {
    let isApp = false;
    let appCommands = sinon.spy();
    let appDidNotGetReady = sinon.spy();

    const sendAppCommands = () => {
      if (!isApp) {
        return false;
      }

      appCommands();

      return true;
    };

    executeWithRetry(25, 100, sendAppCommands, appDidNotGetReady);

    setTimeout(() => {
      expect(appDidNotGetReady.calledOnce).to.be.equals(true);
      expect(appCommands.called).to.be.equals(false);
      done();
    }, 125);
  });
});

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
