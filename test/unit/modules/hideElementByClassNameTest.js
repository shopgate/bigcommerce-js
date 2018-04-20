import chai from 'chai';
import { JSDOM } from 'jsdom';
import { hideElementsByClassName } from '../../../src/modules/hideElementByClassName';

const { expect } = chai;

describe('hideElementByClassName', () => {
  beforeEach(() => {
    const dom = new JSDOM('<html><head></head><body><div class="test">Test content</div><div class="test1">Test1 content</div><div class="test">Another Test content</div></body></html>');
    global.document = dom.window.document;
  });

  it('should hide all elements by its class attribute', () => {
    hideElementsByClassName('test');

    const elements = document.getElementsByClassName('test');
    for (let i = 0; i < elements.length; i += 1) {
      expect(elements[i].style.display).equal('none');
    }
  });

  it('should do nothing when there are no elements with the passed class attribute', () => {
    const htmlContent = '<html><head></head><body><div class="test">Test content</div><div class="test1">Test1 content</div><div class="test">Another Test content</div></body></html>';
    const dom = new JSDOM(htmlContent);
    global.document = dom.window.document;

    hideElementsByClassName('unknown');

    expect(global.document.documentElement.outerHTML).equal(htmlContent);
  });
});
