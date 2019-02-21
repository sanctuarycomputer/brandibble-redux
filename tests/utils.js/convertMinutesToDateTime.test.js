/* global describe it */
import { expect } from 'chai';
import { DateTime } from 'luxon';
import convertMinutesToDateTime from '../../src/utils/convertMinutesToDateTime';
import { DateTimeFormats } from '../../src/utils/constants';

const { HOURS_MINUTES_MERIDIEM } = DateTimeFormats;

describe('utils/convertMinutesToDateTime', () => {
  it('it should convert time in minutes to a valid DateTime object', () => {
    const time = {
      minutes: 765,
      hoursMinutesMeridiem: '12:45 PM',
    };

    const testLuxonDateTimeFromMinutes = convertMinutesToDateTime(time.minutes);
    expect(DateTime.isDateTime(testLuxonDateTimeFromMinutes)).to.be.true;
    expect(
      testLuxonDateTimeFromMinutes.toFormat(HOURS_MINUTES_MERIDIEM),
    ).to.equal(time.hoursMinutesMeridiem);
  });

  it('it should convert time in minutes to a valid DateTime object', () => {
    const time = {
      minutes: 1290,
      hoursMinutesMeridiem: '9:30 PM',
    };
    const testLuxonDateTimeFromMinutes = convertMinutesToDateTime(time.minutes);
    expect(DateTime.isDateTime(testLuxonDateTimeFromMinutes)).to.be.true;
    expect(
      testLuxonDateTimeFromMinutes.toFormat(HOURS_MINUTES_MERIDIEM),
    ).to.equal(time.hoursMinutesMeridiem);
  });
});
