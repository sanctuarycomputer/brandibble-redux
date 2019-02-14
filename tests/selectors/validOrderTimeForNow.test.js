/* global describe it */
import { expect } from 'chai';
import {
  brandibbleStateForOloOrderStub,
  brandibbleStateForCateringOrderStub,
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
});
