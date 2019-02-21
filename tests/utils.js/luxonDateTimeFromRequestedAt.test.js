/* global describe it */
import { expect } from 'chai';
import { DateTime } from 'luxon';
import luxonDateTimeFromRequestedAt from '../../src/utils/luxonDateTimeFromRequestedAt';

describe('utils/luxonDateTimeFromRequestedAt', () => {
  it('it should return a valid luxon DateTime object when passed a string of "asap"', () => {
    const testLuxonDateTimeFromRequestedAt = luxonDateTimeFromRequestedAt(
      'asap',
    );

    expect(DateTime.isDateTime(testLuxonDateTimeFromRequestedAt)).to.be.true;
  });

  it('it should return a valid luxon DateTime object when passed an ISO8601 datetime string', () => {
    const requestedAt = '2020-11-11T16:30:00Z';
    const testLuxonDateTimeFromRequestedAt = luxonDateTimeFromRequestedAt(
      requestedAt,
    );

    expect(DateTime.isDateTime(testLuxonDateTimeFromRequestedAt)).to.be.true;
  });
});
