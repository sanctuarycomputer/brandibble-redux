import get from './get';
import { ErrorCodes } from './constants';

export default function (errors) {
  if (!errors || !errors.length) return [];

  return errors.reduce((formattedArray, error) => {
    // If the current error is not of invalidItems
    // We push it into the array as is, and return the formattedArray
    if (get(error, 'code') !== ErrorCodes.validateCart.invalidItemsInCart) {
      formattedArray.push(error);
      return formattedArray;
    }

    // Otherwise, we can assume the error is an invalitItems error
    // and check whether we've already formatted our invalid items hash
    const existingInvalidItemsHash = formattedArray.find(
      formattedError =>
        get(formattedError, 'code') ===
        ErrorCodes.validateCart.invalidItemsInCart,
    );

    // If we have not formatted our invalidItemsHash
    // we updated the source.pointer to source.pointers
    // which is an array of invalid item ids. We add the current invalid item
    // pointer to the array and return the formattedArray
    if (!existingInvalidItemsHash) {
      const formattedInvalidItemError = Object.assign(
        {},
        { ...error, source: { pointers: [error.source.pointer] } },
      );

      formattedArray.push(formattedInvalidItemError);
      return formattedArray;
    }

    // Finally, if we have an existing invalidItemsHash
    // we push the current invalidItem error's pointer into the pointers array
    // and return the formattedArray
    existingInvalidItemsHash.source.pointers.push(error.source.pointer);
    return formattedArray;
  }, []);
}
