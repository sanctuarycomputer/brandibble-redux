/* global describe it */
import { expect } from 'chai';
import { DateTime } from 'luxon';
import luxonDateTimeFromRequestedAt from '../../src/utils/luxonDateTimeFromRequestedAt';

import {
  brandibbleStateForOloOrderStub,
  brandibbleStateForCateringOrderStub,
  firstTimeForOloLocationStub,
  firstTimeForCateringLocationStub,
} from '../config/stubsForMenuStatusSelector';
import { validOrderTimeForOrder } from '../../src/selectors';

describe('selectors/validOrderTimeForOrder', () => {
  /**
   * OLO Orders
   */

  // TODO: write better it statment
  it("It should return a match in the case an order's requested_at matches a valid order time exactly", () => {
    const testValidOrderTimeForOrder = validOrderTimeForOrder(
      brandibbleStateForCateringOrderStub,
    )(luxonDateTimeFromRequestedAt('asap'));
    // test here
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
