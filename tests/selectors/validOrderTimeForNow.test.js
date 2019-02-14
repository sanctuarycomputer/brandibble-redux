/* global describe it */
import { expect } from 'chai';

import {
  stateForCateringOrderStub,
  stateForOloOrderStub,
  stateForUnconfiguredOrderStub,
} from '../config/stateStubs';

import { validOrderTimeForNow } from '../../src/selectors';

const oloLocationId = 885;
const cateringLocationId = 886;

const serviceType = 'pickup';

describe('selectors/orders/validOrderTimeForNow', () => {
  it('it should return the valid first time object for a olo order location', () => {
    const testValidOrderTimeForNowWithOloOrderStub = validOrderTimeForNow(
      stateForOloOrderStub,
    );

    const firstTimeForOloLocation =
      stateForOloOrderStub.data.locations.locationsById[oloLocationId]
        .first_times[serviceType];

    expect(testValidOrderTimeForNowWithOloOrderStub).to.deep.equal(
      firstTimeForOloLocation,
    );
  });

  it('it should return the valid first time object for a catering order location', () => {
    const testValidOrderTimeForNowWithCateringOrderStub = validOrderTimeForNow(
      stateForCateringOrderStub,
    );

    const firstTimeForCateringLocation =
      stateForCateringOrderStub.data.locations.locationsById[cateringLocationId]
        .first_times[serviceType];

    expect(testValidOrderTimeForNowWithCateringOrderStub).to.deep.equal(
      firstTimeForCateringLocation,
    );
  });

  it('it should return null for a non configured order that (lacks a location_id)', () => {
    const testValidOrderTimeForNowWithUnconfiguredOrderStub = validOrderTimeForNow(
      stateForUnconfiguredOrderStub,
    );

    expect(testValidOrderTimeForNowWithUnconfiguredOrderStub).to.be.null;
  });

  it('it should return the undefined for a non configured order that (lacks a location_id)', () => {
    const testValidOrderTimeForNowWithUnconfiguredOrderStub = validOrderTimeForNow(
      brandibbleStateForUnconfiguredOrderStub,
    );

    expect(testValidOrderTimeForNowWithUnconfiguredOrderStub).to.be.undefined;
  });
});
