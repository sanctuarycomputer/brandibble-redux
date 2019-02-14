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
  it('it should return an object based on the', () => {
    const testValidOrderTimeForOrder = validOrderTimeForOrder(
      brandibbleStateForCateringOrderStub,
    )(luxonDateTimeFromRequestedAt('asap'));
    // test here
  });
});

/**
 * 1. Test that requestedAt as luxon DateTime 
 * returns valid 
 */
{
  date: "2019-02-14",
  daypart: "Breakfast",
  minutes: 480,
  time: "8:00 AM",
  utc: "2019-02-14T16:00:00Z",
  weekday: "thursday"
}