/* global describe it */
import { expect } from 'chai';
import { DateTime } from 'luxon';
import convertDateTimeToMinutes from '../../src/utils/convertDateTimeToMinutes';
import { DateTimeFormats } from '../../src/utils/constants';

const { HOURS_MINUTES_MERIDIEM } = DateTimeFormats;

describe('utils/convertDateTimeToMinutes', () => {
  it('it should convert a luxon DateTime object into minutes', () => {
    const time = {
      minutes: 765,
      hoursMinutesMeridiem: '12:45 PM',
    };

    const testLuxonDateTime = DateTime.fromFormat(
      time.hoursMinutesMeridiem,
      HOURS_MINUTES_MERIDIEM,
    );
    const testLuxonDateTimeInMinutes = convertDateTimeToMinutes(
      testLuxonDateTime,
    );

    expect(testLuxonDateTimeInMinutes).to.equal(time.minutes);
  });

  it('it should convert a luxon DateTime object into minutes', () => {
    const time = {
      minutes: 1290,
      hoursMinutesMeridiem: '9:30 PM',
    };

    const testLuxonDateTime = DateTime.fromFormat(
      time.hoursMinutesMeridiem,
      HOURS_MINUTES_MERIDIEM,
    );
    const testLuxonDateTimeInMinutes = convertDateTimeToMinutes(
      testLuxonDateTime,
    );

    expect(testLuxonDateTimeInMinutes).to.equal(time.minutes);
  });
});
