/* global describe before it */
import { expect } from 'chai';
import { Settings, DateTime } from 'luxon';

import {
  stateForCateringOrderStub,
  stateForOloOrderStub,
  stateForOloOrderStubWithWantsFutureOrder,
  stateForUnconfiguredOrderStub,
} from '../config/stateStubs';
import { Timezones } from '../../src/utils/constants';

import {
  validOrderTimeForOrder,
  menuStatusForOrder,
  validOrderTimeForNow,
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
   * OLO
   */

  it('returns correct response when wantsFutureOrder is true', () => {
    const todayAsLuxonDateTime = DateTime.local();
    const requestedAtAsLuxonDateTime = DateTime.fromISO('2019-02-14T21:00:00Z');

    const testMenuStatusForOrder = menuStatusForOrder(
      stateForOloOrderStubWithWantsFutureOrder,
    )(
      validOrderTimeForOrder(stateForOloOrderStub)(
        requestedAtAsLuxonDateTime,
        todayAsLuxonDateTime,
      ),
    );

    expect(testMenuStatusForOrder.statusCode).to.equal('FUTURE_ORDER_REQUEST');
  });

  /** 1. Test wants future order */
  /** 2. Test 'asap' requested at */
  /** 3. Test 'asap' restaurant CURRENTLY closed */
  /** 4. Test invalid validOrderTimeForOrder */
  /** 5. passed validOrderTimeForOrder */
  /** 6. validOrderTimeForOrder is current */
  /** 7. validOrderTimeForOrder is current */
  /** 8. validOrderTimeForOrder is current restaurant CURRENTLY closed */
  /** 9. validOrderTimeForOrder is future */
});
