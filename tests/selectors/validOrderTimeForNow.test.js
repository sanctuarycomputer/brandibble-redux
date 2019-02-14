/* global describe it */
import { expect } from 'chai';
import {
  brandibbleStateForOloOrderStub,
  brandibbleStateForCateringOrderStub,
  brandibbleStateForUnconfiguredOrderStub,
  firstTimeForOloLocationStub,
  firstTimeForCateringLocationStub,
} from '../config/stubsForMenuStatusSelector';
import { validOrderTimeForNow } from '../../src/selectors';

describe('selectors/validOrderTimeForNow', () => {
  it('it should return the valid first time object for a olo order location', () => {
    const testValidOrderTimeForNowWithOloOrderStub = validOrderTimeForNow(
      brandibbleStateForOloOrderStub,
    );

    expect(testValidOrderTimeForNowWithOloOrderStub).to.deep.equal(
      firstTimeForOloLocationStub,
    );
  });

  it('it should return the valid first time object for a catering order location', () => {
    const testValidOrderTimeForNowWithCateringOrderStub = validOrderTimeForNow(
      brandibbleStateForCateringOrderStub,
    );

    expect(testValidOrderTimeForNowWithCateringOrderStub).to.deep.equal(
      firstTimeForCateringLocationStub,
    );
  });

  it('it should return the undefined for a non configured order that (lacks a location_id)', () => {
    const testValidOrderTimeForNowWithUnconfiguredOrderStub = validOrderTimeForNow(
      brandibbleStateForUnconfiguredOrderStub,
    );

    expect(testValidOrderTimeForNowWithUnconfiguredOrderStub).to.be.undefined;
  });
});
