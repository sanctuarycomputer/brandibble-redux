/* global describe it */
import { expect } from 'chai';

import {
  brandibbleStateForCateringOrderStub,
  brandibbleStateForOloOrderStub,
  brandibbleStateForUnconfiguredOrderStub,
} from '../config/brandibbleStateStubs';

import { validOrderTimeForNow } from '../../src/selectors';

const oloLocationId = 885;
const cateringLocationId = 886;

const serviceType = 'pickup';

describe('selectors/validOrderTimeForNow', () => {
  it('it should return the valid first time object for a olo order location', () => {
    const testValidOrderTimeForNowWithOloOrderStub = validOrderTimeForNow(
      brandibbleStateForOloOrderStub,
    );

    const firstTimeForOloLocation =
      brandibbleStateForOloOrderStub.data.locations.locationsById[oloLocationId]
        .first_times[serviceType];

    expect(testValidOrderTimeForNowWithOloOrderStub).to.deep.equal(
      firstTimeForOloLocation,
    );
  });

  it('it should return the valid first time object for a catering order location', () => {
    const testValidOrderTimeForNowWithCateringOrderStub = validOrderTimeForNow(
      brandibbleStateForCateringOrderStub,
    );

    const firstTimeForCateringLocation =
      brandibbleStateForCateringOrderStub.data.locations.locationsById[
        cateringLocationId
      ].first_times[serviceType];

    expect(testValidOrderTimeForNowWithCateringOrderStub).to.deep.equal(
      firstTimeForCateringLocation,
    );
  });

  it('it should return null for a non configured order that (lacks a location_id)', () => {
    const testValidOrderTimeForNowWithUnconfiguredOrderStub = validOrderTimeForNow(
      brandibbleStateForUnconfiguredOrderStub,
    );

    expect(testValidOrderTimeForNowWithUnconfiguredOrderStub).to.be.null;
  });
});
