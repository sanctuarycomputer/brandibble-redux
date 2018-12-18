/* global describe it */
import { expect } from 'chai';
import {
  RESOLVE_ORDER,
  SET_ORDER_LOCATION_ID,
  ADD_LINE_ITEM,
  PUSH_LINE_ITEM,
  ADD_OPTION_TO_LINE_ITEM,
  SET_PROMO_CODE,
  SET_SERVICE_TYPE,
  SET_MISC_OPTIONS,
  SET_REQUESTED_AT,
  VALIDATE_CURRENT_CART,
} from 'actions/session/order';
import reducer from 'reducers/session/order';
import { makeUnpersistedOrder, productStub, validatedCartStub, buildLineItem } from '../../config/stubs';

const initialState = {};

describe('reducers/session/order', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.equal(initialState);
  });

  it('handles the RESOLVE_ORDER_FULFILLED action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${RESOLVE_ORDER}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.lineItemsData).to.be.present;
  });

  it('handles the VALIDATE_CURRENT_CART_FULFILLED action', () => {
    const reduced = reducer(initialState, {
      type: `${VALIDATE_CURRENT_CART}_FULFILLED`,
      payload: { validatedCartStub },
    });
    expect(reduced.validatedCart).to.be.present;
    expect(reduced.validatedCart).to.deep.equal({ validatedCartStub });
  });

  it('handles the SET_CURRENT_ORDER_ID action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${SET_ORDER_LOCATION_ID}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.orderData.location_id).to.be.present;
    expect(reduced.lineItemsData).to.be.present;
  });

  it('handles the SET_PROMO_CODE action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${SET_PROMO_CODE}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.orderData.promo_code).to.be.present;
  });

  it('handles the SET_SERVICE_TYPE action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${SET_SERVICE_TYPE}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.orderData.serviceType).to.be.present;
  });

  it('handles the SET_MISC_OPTIONS action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${SET_MISC_OPTIONS}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.orderData.notes_for_store).to.be.present;
  });

  it('handles the SET_REQUESTED_AT action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const reduced = reducer(initialState, {
      type: `${SET_REQUESTED_AT}_FULFILLED`,
      payload: { order: dummyOrder },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.orderData.requested_at).to.be.present;
  });

  /* Note: The below all trigger the same case in the reducer, so no point testing them all. */
  it('handles the ADD_LINE_ITEM_FULFILLED action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const lineItem = dummyOrder.cart.addLineItem(productStub, 1);
    const reduced = reducer(initialState, {
      type: `${ADD_LINE_ITEM}_FULFILLED`,
      payload: { order: dummyOrder, lineItem },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.lineItemsData.length).to.equal(1);
    expect(reduced.lineItemsData[0].optionGroupMappings).to.be.present;
  });

  it('handles the PUSH_LINE_ITEM_FULFILLED action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const lineItem = dummyOrder.cart.addLineItem(productStub, 1);
    const reduced = reducer(initialState, {
      type: `${PUSH_LINE_ITEM}_FULFILLED`,
      payload: { order: dummyOrder, lineItem },
    });
    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.lineItemsData.length).to.equal(1);
    expect(reduced.lineItemsData[0].optionGroupMappings).to.be.present;
  });

  it('handles the ADD_OPTION_TO_LINE_ITEM_FULLFILLED action', () => {
    const dummyOrder = makeUnpersistedOrder();
    const lineItem = dummyOrder.cart.addLineItem(productStub, 1);

    let reduced = reducer(initialState, {
      type: `${ADD_LINE_ITEM}_FULFILLED`,
      payload: { order: dummyOrder, lineItem },
    });

    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.lineItemsData.length).to.equal(1);
    expect(reduced.lineItemsData[0].optionGroupMappings).to.be.present;

    expect(reduced.lineItemsData[0].optionGroupMappings[0].currentlySelectedCount).to.equal(0);
    expect(reduced.orderData.cart[0].option_groups.length).to.equal(0);

    const optionGroup = reduced.lineItemsData[0].optionGroupMappings[0].optionGroupData;
    const optionItem = reduced.lineItemsData[0].optionGroupMappings[0].optionItems[0].optionItemData;

    dummyOrder.cart.addOptionToLineItem(lineItem, optionGroup, optionItem);

    reduced = reducer(initialState, {
      type: `${ADD_OPTION_TO_LINE_ITEM}_FULFILLED`,
      payload: { order: dummyOrder, lineItem },
    });

    expect(reduced.ref).to.deep.equal(dummyOrder);
    expect(reduced.orderData).to.be.present;
    expect(reduced.lineItemsData.length).to.equal(1);
    expect(reduced.lineItemsData[0].optionGroupMappings).to.be.present;

    expect(reduced.lineItemsData[0].optionGroupMappings[0].currentlySelectedCount).to.equal(1);
    expect(reduced.orderData.cart[0].option_groups.length).to.equal(1);
  });
});
