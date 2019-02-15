/* global describe before it */
import { expect } from 'chai';
import { Settings, DateTime } from 'luxon';
import luxonDateTimeFromRequestedAt from '../../src/utils/luxonDateTimeFromRequestedAt';

import {
  brandibbleStateForCateringOrderStub,
  brandibbleStateForOloOrderStub,
  brandibbleStateForUnconfiguredOrderStub,
} from '../config/brandibbleStateStubs';
import { Timezones } from '../../src/utils/constants';

import { validOrderTimeForOrder } from '../../src/selectors';

const { PACIFIC } = Timezones;

describe('selectors/validOrderTimeForOrder', () => {
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
   * OLO Orders
   */

  it('should return null, if the requestedAt is in the past', () => {
    const todayAsLuxonDateTime = DateTime.local();
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T21:00:00Z');

    const testValidOrderTimeForOrder = validOrderTimeForOrder(
      brandibbleStateForOloOrderStub,
    )(requestedAtAsLuxonDateTime, todayAsLuxonDateTime);

    expect(testValidOrderTimeForOrder).to.be.null;
  });

  it('should return null, if the requestedAt is greater than the days_ahead threshold', () => {
    /**
     * days_ahead for our OLO mocks
     * is 6, which implies 7 days (0 being today)
     */
    const todayAsLuxonDateTime = DateTime.local();
    const requestedAtAsLuxonDateTime = todayAsLuxonDateTime.plus({ days: 7 });

    const testValidOrderTimeForOrder = validOrderTimeForOrder(
      brandibbleStateForOloOrderStub,
    )(requestedAtAsLuxonDateTime, todayAsLuxonDateTime);

    expect(testValidOrderTimeForOrder).to.be.null;
  });

  // TODO: Cleanup IT statement
  it('should return expected match', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');

    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');

    const testValidOrderTimeForOrder = validOrderTimeForOrder(
      brandibbleStateForOloOrderStub,
    )(requestedAtAsLuxonDateTime, todayAsLuxonDateTime);
  });
});

/**
 * Should mirror valid order time for now shape
 *
  {
   date: "2019-02-14",
    daypart: "Breakfast",
    minutes: 480,
    time: "8:00 AM",
    utc: "2019-02-14T16:00:00Z",
    weekday: "thursday"
  }
 */

/**
 * 1. Test selector returns
 * correct data when a match is possible
 */

/**
 * 2. Test selector returns null
 * when a match is not possible
 */

/**
 * 3. Test against catering order
 * - Does this need to take into account skipped dayparts/first available time
 * - This should NOT take into account days_ahead, as catering locations have days_ahead of null
 */

/**
 * 4. Test against olo order
 * - This SHOULD take into account days_ahead
 */
