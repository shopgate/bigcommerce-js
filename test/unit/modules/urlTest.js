import { describe, it } from "mocha";
import { getParameterFromQueryString } from "../../../src/modules/url";
import { expect } from "chai";

describe('url', () => {
  describe('getParameterFromQueryString', () => {
    it('should find regular sgcloud_callback_data paramerter having invalid query string provided', () => {
      const result = getParameterFromQueryString('?action=create_account?sgcloud_callback_data=%7B%22redirectTo%22%3A%22%2F%22%7D&action=create_account', 'sgcloud_callback_data');
      expect(result).equals('{"redirectTo":"/"}');
    });

    it('should find regular sgcloud_callback_data paramerter having valid query string provided', () => {
      let result = getParameterFromQueryString('?sgcloud_callback_data=%7B%22redirectTo%22%3A%22%2F%22%7D&action=create_account', 'sgcloud_callback_data');
      expect(result).equals('{"redirectTo":"/"}');
      result = getParameterFromQueryString('?action=create_account&sgcloud_callback_data=%7B%22redirectTo%22%3A%22%2F%22%7D', 'sgcloud_callback_data');
      expect(result).equals('{"redirectTo":"/"}');
    });

    it('should not find sgcloud_callback_data paramerter when it was not provided', () => {
      let result = getParameterFromQueryString('?action=create_account', 'sgcloud_callback_data');
      expect(result).equals(null);
      result = getParameterFromQueryString('', 'sgcloud_callback_data');
      expect(result).equals(null);
      result = getParameterFromQueryString('?', 'sgcloud_callback_data');
      expect(result).equals(null);
    });
  });
});
