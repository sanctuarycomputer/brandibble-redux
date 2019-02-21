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
  ORDERING_FOR_CURRENT_DAYPART,
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
      ORDERING_FOR_CURRENT_DAYPART,
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
    });
  });

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
      ORDERING_FOR_CURRENT_DAYPART,
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
    });
  });

  it('returns correct response when wantsFutureOrder is false, and validOrderTimeForOrder is after the validOrderTimeForNow', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:35:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-16T20:45:00Z');

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
