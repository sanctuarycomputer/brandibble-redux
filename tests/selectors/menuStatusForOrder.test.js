/* global describe before it */
import { expect } from 'chai';
import { Settings, DateTime } from 'luxon';

import {
  brandibbleStateForCateringOrderStub,
  brandibbleStateForOloOrderStub,
  brandibbleStateForUnconfiguredOrderStub,
} from '../config/brandibbleStateStubs';
import { Timezones } from '../../src/utils/constants';

import {
  validOrderTimeForOrder,
  menuStatusForOrder,
} from '../../src/selectors';

const { PACIFIC } = Timezones;

describe('selectors/menuStatusForOrder', () => {
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

  it('returns null, if the requestedAt is in the past', () => {
    const todayAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T20:45:00Z');

    const testMenuStatusForOrder = menuStatusForOrder(
      brandibbleStateForOloOrderStub,
    )(
      validOrderTimeForOrder(brandibbleStateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );
  });
});
