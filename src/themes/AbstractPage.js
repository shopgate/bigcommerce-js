/**
 * Mimik an interface for pages
 */
export class AbstractPage {
  /**
   * @param {ShopgateAppCodeExecutor} shopgateAppCodeExecutor executes Shopgate App related code
   */
  constructor(shopgateAppCodeExecutor) {
    this.shopgateAppCodeExecutor = shopgateAppCodeExecutor;
  }

  /**
   * Default implementation of this 'interface'
   */
  execute() {}
}
