/* global describe it */
import { expect } from 'chai';
import { DateTime } from 'luxon';
import { WantsFutureReasons, Asap } from '../../src/utils/constants';
import determineIfWantsFuture from '../../src/utils/determineIfWantsFuture';

describe('utils/determineIfWantsFuture', () => {
  it('It should return wantsFuture = false and reason = isAsap if requestedAt is "asap"', () => {
    const requestedAt = Asap;
    const { wantsFuture, reason } = determineIfWantsFuture(requestedAt);

    expect(wantsFuture).to.equal(false);
    expect(reason).to.equal(WantsFutureReasons.isAsap);
  });

  it('It should return wantsFuture = false and reason = isPast if requestedAt is in the past', () => {
    const requestedAt = DateTime.local()
      .minus({ hours: 2 })
      .toISO();
    const { wantsFuture, reason } = determineIfWantsFuture(requestedAt);

    expect(wantsFuture).to.equal(false);
    expect(reason).to.equal(WantsFutureReasons.isPast);
  });

  it('It should return wantsFuture = false and reason = isNow if requestedAt is equal to now', () => {
    const now = DateTime.local();
    const requestedAt = now.toISO();
    const { wantsFuture, reason } = determineIfWantsFuture(requestedAt, now);

    expect(wantsFuture).to.equal(false);
    expect(reason).to.equal(WantsFutureReasons.isNow);
  });

  it('It should return wantsFuture = true and reason = isFuture if requestedAt is in the future', () => {
    const requestedAt = DateTime.local()
      .plus({ hours: 2 })
      .toISO();
    const { wantsFuture, reason } = determineIfWantsFuture(requestedAt);

    expect(wantsFuture).to.equal(true);
    expect(reason).to.equal(WantsFutureReasons.isFuture);
  });
});
