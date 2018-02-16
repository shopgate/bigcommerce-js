import chai from 'chai';
import { JSDOM } from 'jsdom';
import { hideElementById } from '../../../src/modules/hideElementById';

const { expect } = chai;

describe('hideElementById', () => {
  beforeEach(() => {
    const dom = new JSDOM('<html><head></head><body><div id="test">Test content</div></body></html>');
    global.document = dom.window.document;
  });

  it('should hide the element by its id attribute', () => {
    hideElementById('test');

    const element = document.getElementById('test');
    expect(element.style.display).equal('none');
  });

  it('should do nothing when there is no element with the passed id', () => {
    const htmlContent = '<html><head></head><body><div id="test">Test content</div></body></html>';
    const dom = new JSDOM(htmlContent);
    global.document = dom.window.document;

    hideElementById('unknown');

    expect(global.document.documentElement.outerHTML).equal(htmlContent);
  });
});
