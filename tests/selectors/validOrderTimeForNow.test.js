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
  it('it should return an object based on the', () => {
    const testValidOrderTimeForNowWithOloOrderStub = validOrderTimeForNow(
      brandibbleStateForOloOrderStub,
    );
    const testValidOrderTimeForNowWithCateringOrderStub = validOrderTimeForNow(
      brandibbleStateForCateringOrderStub,
    );

    expect(testValidOrderTimeForNowWithOloOrderStub).to.deep.equal(
      firstTimeForOloLocationStub,
    );
    expect(testValidOrderTimeForNowWithCateringOrderStub).to.deep.equal(
      firstTimeForCateringLocationStub,
    );
  });
});
