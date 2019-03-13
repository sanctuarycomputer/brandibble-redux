import get from './get';

export default (invalidItems, lineItemsData) =>
  invalidItems.reduce((invalidItemsFromCart, invalidItem) => {
    lineItemsData
      .filter(
        lineItem =>
          get(lineItem, 'productData.id') === get(invalidItem, 'source.pointer'),
      )
      .forEach(lineItem => invalidItemsFromCart.push(lineItem));
    return invalidItemsFromCart;
  }, []);
