import { describe, it } from "mocha";
import { getRedirectPath } from "../../../src/modules/shopgateApp";
import { expect } from "chai";

describe('shopgateApp', () => {
  describe('getRedirectPath', () => {
    beforeEach(() => {
      global.window = { location: { href: '' }};
    });

    it('should default to `/`', () => {
      window.location.href = 'https://store.bigcommerce.com/';
      expect(getRedirectPath()).equals('/');
      window.location.href = 'https://store.bigcommerce.com/?';
      expect(getRedirectPath()).equals('/');
      window.location.href = 'https://store.bigcommerce.com/?action=create_account';
      expect(getRedirectPath()).equals('/');
    });

    it('should return path provided in sgcloud_callback_data parameter', () => {
      window.location.href = 'https://store.bigcommerce.com/?action=create_account&sgcloud_callback_data=%7B%22redirectTo%22%3A%22%2Fcart%22%7D';
      expect(getRedirectPath()).equals('/cart');
      window.location.href = 'https://store.bigcommerce.com/?action=create_account&sgcloud_callback_data=%7B%22redirectTo%22%3A%22%2F%22%7D';
      expect(getRedirectPath()).equals('/');
    });
  });
});