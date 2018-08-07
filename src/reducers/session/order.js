import map from 'lodash.map';
import {
  ADD_LINE_ITEM,
  PUSH_LINE_ITEM,
  ADD_OPTION_TO_LINE_ITEM,
  BIND_CUSTOMER_TO_ORDER,
  UNBIND_CUSTOMER_FROM_ORDER,
  REMOVE_LINE_ITEM,
  REMOVE_OPTION_FROM_LINE_ITEM,
  RESOLVE_ORDER,
  SET_LINE_ITEM_QUANTITY,
  SET_ORDER_ADDRESS,
  SET_ORDER_LOCATION_ID,
  SET_PAYMENT_METHOD,
  SET_PROMO_CODE,
  SET_MISC_OPTIONS,
  SET_REQUESTED_AT,
  CREATE_NEW_ORDER,
  VALIDATE_CURRENT_ORDER,
  VALIDATE_CURRENT_CART,
  SUBMIT_ORDER,
  SET_LINE_ITEM_MADE_FOR,
  SET_LINE_ITEM_INSTRUCTIONS,
} from '../../actions/session/order';

const initialState = {
  ref: null,
  orderData: null,
  lineItemsData: null,
  validated: null,
  validatedCart: null,
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

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${RESOLVE_ORDER}_FULFILLED`:
    case `${BIND_CUSTOMER_TO_ORDER}_FULFILLED`:
    case `${UNBIND_CUSTOMER_FROM_ORDER}_FULFILLED`:
    case `${SET_ORDER_LOCATION_ID}_FULFILLED`:
    case `${SET_ORDER_ADDRESS}_FULFILLED`:
    case `${ADD_LINE_ITEM}_FULFILLED`:
    case `${PUSH_LINE_ITEM}_FULFILLED`:
    case `${SET_LINE_ITEM_QUANTITY}_FULFILLED`:
    case `${SET_LINE_ITEM_MADE_FOR}_FULFILLED`:
    case `${SET_LINE_ITEM_INSTRUCTIONS}_FULFILLED`:
    case `${REMOVE_LINE_ITEM}_FULFILLED`:
    case `${ADD_OPTION_TO_LINE_ITEM}_FULFILLED`:
    case `${SET_PAYMENT_METHOD}_FULFILLED`:
    case `${SET_PROMO_CODE}_FULFILLED`:
    case `${SET_MISC_OPTIONS}_FULFILLED`:
    case `${SET_REQUESTED_AT}_FULFILLED`:
    case `${REMOVE_OPTION_FROM_LINE_ITEM}_FULFILLED`:
    case `${CREATE_NEW_ORDER}_FULFILLED`: {
      const ref = payload.order;
      return {
        ...state,
        ref,
        orderData: { ...ref.format(), wantsFutureOrder: ref.wantsFutureOrder },
        lineItemsData: _buildFormattedLineItemsHash(ref),
      };
    }

    case `${SUBMIT_ORDER}_FULFILLED`: {
      return {
        ...state,
        validated: null,
        validatedCart: null,
      };
    }

    case `${VALIDATE_CURRENT_ORDER}_FULFILLED`: {
      return {
        ...state,
        validated: payload,
      };
    }

    case `${VALIDATE_CURRENT_CART}_FULFILLED`: {
      return {
        ...state,
        validatedCart: payload,
      };
    }

    default:
      return state;
  }
};
