import get from './get';
import { ApiVersion } from './constants';

export default (invalidItems, lineItemsData, options) => {
  /**
   * apiVersion: v2
   */
  if (get(options, 'apiVersion') === ApiVersion.V2) {
    return invalidItems.reduce((invalidItemsFromCart, invalidItemId) => {
      lineItemsData
        .filter(lineItem => get(lineItem, 'productData.id') === invalidItemId)
        .forEach(lineItem => invalidItemsFromCart.push(lineItem));
      return invalidItemsFromCart;
    }, []);
  }

  /**
   * apiVersion: v1
   */
  return invalidItems.reduce((invalidItemsFromCart, invalidItem) => {
    lineItemsData
      .filter(
        lineItem =>
          get(lineItem, 'productData.id') === get(invalidItem, 'source.pointer'),
      )
      .forEach(lineItem => invalidItemsFromCart.push(lineItem));
    return invalidItemsFromCart;
  }, []);
};
