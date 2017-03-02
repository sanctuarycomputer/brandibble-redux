import map from 'lodash.map';

import {
  RESOLVE_ORDER,
  SET_ORDER_LOCATION_ID,
  ADD_LINE_ITEM,
  SET_LINE_ITEM_QUANTITY,
  REMOVE_LINE_ITEM,
  ADD_OPTION_TO_LINE_ITEM,
  REMOVE_OPTION_FROM_LINE_ITEM,
} from 'actions/session/order';

const initialState = {
  ref: null,
  orderData: null,
  lineItemsData: null,
};

function _buildFormattedLineItemsHash(ref) {
  return map(ref.cart.lineItems, (li) => {
    const { uuid, quantity, madeFor, instructions, product, operationMaps } = li;
    return {
      uuid,
      quantity,
      madeFor,
      instructions,
      isValid: li.isValid(),
      errors: li.errors(),
      productData: product,
      optionGroupMappings: operationMaps,
    };
  });
}

export default function order(state = initialState, action) {
  switch (action.type) {
    case `${RESOLVE_ORDER}_FULFILLED`:
    case `${SET_ORDER_LOCATION_ID}_FULFILLED`:
    case `${ADD_LINE_ITEM}_FULFILLED`:
    case `${SET_LINE_ITEM_QUANTITY}_FULFILLED`:
    case `${REMOVE_LINE_ITEM}_FULFILLED`:
    case `${ADD_OPTION_TO_LINE_ITEM}_FULFILLED`:
    case `${REMOVE_OPTION_FROM_LINE_ITEM}_FULFILLED`: {
      const ref = action.payload.order;
      return {
        ...state,
        ref,
        orderData: ref.format(),
        lineItemsData: _buildFormattedLineItemsHash(ref),
      };
    }
    default:
      return state;
  }
}
