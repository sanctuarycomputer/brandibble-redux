/* global describe before it */
import { expect } from 'chai';
import { Settings, DateTime } from 'luxon';
import get from 'utils/get';

import {
  stateForOloOrderStub,
  stateForOloOrderStubWithWantsFutureOrder,
  stateForOloOrderStubWithAsapRequestedAt,
} from '../config/stateStubs';
import { Timezones, MenuStatusCodes } from '../../src/utils/constants';

import {
  validOrderTimeForOrder,
  menuStatusForOrder,
} from '../../src/selectors';
/** This implementation is useful for testing purposes */
import { _menuStatusForOrder } from '../../src/selectors/orders/menuStatusForOrder';

const { PACIFIC } = Timezones;
const {
  FUTURE_ORDER_REQUEST,
  ASAP_ORDER_REQUEST,
  INVALID_REQUESTED_AT,
  REQUESTED_AT_HAS_PASSED,
  ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME,
  ORDERING_FOR_FUTURE_DAYPART,
} = MenuStatusCodes;

/** Tests public implementation */

describe('selectors/orders/menuStatusForOrder', () => {
  it('returns a valid payload', () => {
    const testPublicMenuStatusForOrder = menuStatusForOrder(
      stateForOloOrderStub,
    );

    expect(testPublicMenuStatusForOrder.statusCode).to.exist;
    expect(testPublicMenuStatusForOrder.statusCode).to.be.oneOf([
      FUTURE_ORDER_REQUEST,
      ASAP_ORDER_REQUEST,
      INVALID_REQUESTED_AT,
      REQUESTED_AT_HAS_PASSED,
      ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME,
      ORDERING_FOR_FUTURE_DAYPART,
    ]);
  });
});

/** Tests private/internal implementation */

describe('selectors/orders/_menuStatusForOrder', () => {
  before(() => {
    /**
     * Globally set Timezone to that
     * of test locations (in our case 'America/Los_Angeles')
     */
    Settings.defaultZoneName = PACIFIC;
    const testDateTime = DateTime.local();

    expect(testDateTime.zoneName).to.equal(PACIFIC);
  });
  /**
   * OLO
   */

  /** DOES want future order */

  /**
   * In this scenario, the customer is actively requesting an order
   * for a time in the future.
   *
   * We therefore expect the menu status
   * to return a status code of FUTURE_ORDER_REQUEST
   * and a pyload with the validOrderTimeForOrder
   */
  it('returns correct response when wantsFutureOrder is true', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-16T20:45:00Z');

    const testMenuStatusForOrder = _menuStatusForOrder(
      stateForOloOrderStubWithWantsFutureOrder,
    )(
      validOrderTimeForOrder(stateForOloOrderStubWithWantsFutureOrder)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(FUTURE_ORDER_REQUEST);
    expect(testMenuStatusForOrder.meta).to.deep.equal({
      validOrderTimeForOrder: {
        date: '2019-02-16',
        daypart: 'Lunch ', // Note the trailing space
        minutes: 765,
        time: '12:45 PM',
        utc: '2019-02-16T20:45:00Z',
        weekday: 'saturday',
      },
    });
  });

  /** does NOT want future order */

  /**
   * In this scenario, the customer is NOT actively requesting an order
   * for a time in the future. But has requested an order for 'asap'
   * the assumption here is that the customer is requesting a non catering order,
   * and therefore 'asap' is a valid requested at
   *
   * This is the most common case for an online order
   *
   * We therefore expect the menu status
   * to return a status code of ASAP_ORDER_REQUEST
   * and a payload with that includes:
   * {
   *   currentDaypart: Object
   *   currentDaypartIsOrderable: Bool
   *   currentDaypartIsInTheFuture: Bool,
   *   validOrderTimeForOrder: Object
   * }
   *
   */
  it("returns correct response when wantsFutureOrder is false, and requested at is 'asap'", () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');
    const testLocationId = get(
      stateForOloOrderStubWithAsapRequestedAt,
      'session.order.orderData.location_id',
    );
    const testServiceType = get(
      stateForOloOrderStubWithAsapRequestedAt,
      'session.order.orderData.service_type',
    );
    const testLocation = get(
      stateForOloOrderStubWithAsapRequestedAt,
      `data.locations.locationsById.${testLocationId}`,
    );

    const testMenuStatusForOrder = _menuStatusForOrder(
      stateForOloOrderStubWithAsapRequestedAt,
    )(
      validOrderTimeForOrder(stateForOloOrderStubWithAsapRequestedAt)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(ASAP_ORDER_REQUEST);
    expect(testMenuStatusForOrder.meta).to.deep.equal({
      currentDaypart: get(testLocation, `current_daypart.${testServiceType}`),
      currentDaypartIsOrderable: get(
        testLocation,
        `current_daypart.${testServiceType}.is_orderable`,
      ),
      currentDaypartIsInTheFuture:
        get(testLocation, `current_daypart.${testServiceType}.is_orderable`) &&
        !get(testLocation, `current_daypart.${testServiceType}.is_current`),
      validOrderTimeForOrder: {
        date: '2019-02-14',
        daypart: 'Lunch ', // Note the trailing space
        minutes: 765,
        time: '12:45 PM',
        utc: '2019-02-14T20:45:00Z',
        weekday: 'thursday',
      },
    });
  });

  /**
   * Rare Case:
   * In this scenario, the requestedAt cannot be found because it is somehow outside
   * the bounds of the valid_times for a location of a specified order_type.
   * This could potentailly be the result of a change in the backend after a customer has
   * selected their requested at, but before they have submitted their order.
   *
   * We therefore return a statusCode of INVALID_REQUESTED_AT
   * and no meta data, as this should trigger the scheduled updateInvalidOrderRequestedAt
   * observer.
   */
  it('returns correct response when wantsFutureOrder is false, and validOrderTimeForOrder cannot be found', () => {
    const todayAsLuxonDateTime = DateTime.local();
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T21:00:00Z');

    const testMenuStatusForOrder = _menuStatusForOrder(stateForOloOrderStub)(
      validOrderTimeForOrder(stateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(INVALID_REQUESTED_AT);
    /** No Meta expected */
  });

  /**
   * Rare Case:
   * In this scenario, the requestedAt has gone out of date, and is now considered in the past
   *
   * We therefore return a statusCode of REQUESTED_AT_HAS_PASSED
   * and no meta data, as this should trigger the scheduled updateInvalidOrderRequestedAt
   * observer to update the order's requested at to 'asap' for olo orders, and the current date time
   * in ISO8601 format for catering orders.
   */
  it('returns correct response when wantsFutureOrder is false, and validOrderTimeForOrder is before validOrderTimeForNow', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T18:45:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T18:45:00Z');

    const testMenuStatusForOrder = _menuStatusForOrder(stateForOloOrderStub)(
      validOrderTimeForOrder(stateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(REQUESTED_AT_HAS_PASSED);
    /** No Meta expected */
  });

  /**
   * In this scenario, the customer has explicitly selected the first available daypart,
   * but not an 'asap' order. This is likely more common for a catering order, as a requested at
   * of 'asap' is not permitted, and therefore requires the current date time as an explicit
   * ISO8601 string
   *
   * This is the good case for catering orders
   *
   * We therefore expect the menu status
   * to return a status code of ORDERING_FOR_FIRST_AVAILABLE_DAYPART
   * and a payload that includes:
   * {
   *   currentDaypart: Object
   *   currentDaypartIsOrderable: Bool
   *   currentDaypartIsInTheFuture: Bool,
   *   validOrderTimeForOrder: Object
   * }
   */
  it('returns correct response when wantsFutureOrder is false, and validOrderTimeForOrder matches the validOrderTimeForNow', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');
    const testLocationId = get(
      stateForOloOrderStub,
      'session.order.orderData.location_id',
    );
    const testServiceType = get(
      stateForOloOrderStub,
      'session.order.orderData.service_type',
    );
    const testLocation = get(
      stateForOloOrderStub,
      `data.locations.locationsById.${testLocationId}`,
    );

    const testMenuStatusForOrder = _menuStatusForOrder(stateForOloOrderStub)(
      validOrderTimeForOrder(stateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(
      ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME,
    );
    expect(testMenuStatusForOrder.meta).to.deep.equal({
      currentDaypart: get(testLocation, `current_daypart.${testServiceType}`),
      currentDaypartIsOrderable: get(
        testLocation,
        `current_daypart.${testServiceType}.is_orderable`,
      ),
      currentDaypartIsInTheFuture:
        get(testLocation, `current_daypart.${testServiceType}.is_orderable`) &&
        !get(testLocation, `current_daypart.${testServiceType}.is_current`),
      validOrderTimeForOrder: {
        date: '2019-02-14',
        daypart: 'Lunch ', // Note the trailing space
        minutes: 765,
        time: '12:45 PM',
        utc: '2019-02-14T20:45:00Z',
        weekday: 'thursday',
      },
    });
  });

  /**
   * In this scenario, the customer has not explicitly requested a future order
   * but is ordering for a future daypart. This might be the result of a customer's requested at
   * being programtically updated to ensure a valid requested at is set
   *
   * We therefore expect the menu status
   * to return a status code of ORDERING_FOR_FUTURE_DAYPART
   * and a payload with the validOrderTimeForOrder, and the unorderableCurrentDaypart
   */
  it('returns correct response when wantsFutureOrder is false, and validOrderTimeForOrder is after the validOrderTimeForNow', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-16T20:45:00Z');

    const testLocationId = get(
      stateForOloOrderStub,
      'session.order.orderData.location_id',
    );
    const testServiceType = get(
      stateForOloOrderStub,
      'session.order.orderData.service_type',
    );
    const testLocation = get(
      stateForOloOrderStub,
      `data.locations.locationsById.${testLocationId}`,
    );

    const testMenuStatusForOrder = _menuStatusForOrder(stateForOloOrderStub)(
      validOrderTimeForOrder(stateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal(
      ORDERING_FOR_FUTURE_DAYPART,
    );

    expect(testMenuStatusForOrder.meta).to.deep.equal({
      unorderableCurrentDaypart: get(
        testLocation,
        `current_daypart.${testServiceType}`,
      ),
      validOrderTimeForOrder: {
        date: '2019-02-16',
        daypart: 'Lunch ', // Note the trailing space
        minutes: 765,
        time: '12:45 PM',
        utc: '2019-02-16T20:45:00Z',
        weekday: 'saturday',
      },
    });
  });
});
