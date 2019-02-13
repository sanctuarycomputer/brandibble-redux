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
