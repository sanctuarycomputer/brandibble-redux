import map from 'lodash.map';
import {
  ADD_LINE_ITEM,
  ADD_OPTION_TO_LINE_ITEM,
  BIND_CUSTOMER_TO_ORDER,
  REMOVE_LINE_ITEM,
  REMOVE_OPTION_FROM_LINE_ITEM,
  RESOLVE_ORDER,
  SET_LINE_ITEM_QUANTITY,
  SET_ORDER_ADDRESS,
  SET_ORDER_LOCATION_ID,
  SET_PAYMENT_METHOD,
  SET_PROMO_CODE,
  SET_REQUESTED_AT,
  CREATE_NEW_ORDER,
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
    case `${BIND_CUSTOMER_TO_ORDER}_FULFILLED`:
    case `${SET_ORDER_LOCATION_ID}_FULFILLED`:
    case `${SET_ORDER_ADDRESS}_FULFILLED`:
    case `${ADD_LINE_ITEM}_FULFILLED`:
    case `${SET_LINE_ITEM_QUANTITY}_FULFILLED`:
    case `${REMOVE_LINE_ITEM}_FULFILLED`:
    case `${ADD_OPTION_TO_LINE_ITEM}_FULFILLED`:
    case `${SET_PAYMENT_METHOD}_FULFILLED`:
    case `${SET_PROMO_CODE}_FULFILLED`:
    case `${SET_REQUESTED_AT}_FULFILLED`:
    case `${REMOVE_OPTION_FROM_LINE_ITEM}_FULFILLED`:
    case CREATE_NEW_ORDER: {
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
