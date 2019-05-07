import get from './get';

export default (invalidItemIds, lineItemsData) =>
  invalidItemIds.reduce((invalidItemsFromCart, invalidItemId) => {
    lineItemsData
      .filter(lineItem => get(lineItem, 'productData.id') === invalidItemId)
      .forEach(lineItem => invalidItemsFromCart.push(lineItem));
    return invalidItemsFromCart;
  }, []);
