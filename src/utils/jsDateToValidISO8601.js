import { DateTime } from 'luxon';

export default (date = new Date()) => {
  const dateAsLuxonDateTime = DateTime.fromJSDate(date);
  const dateAsLuxonDateTimeInUtc = dateAsLuxonDateTime.setZone('utc');

  return `${dateAsLuxonDateTimeInUtc.toISO().split('.')[0]}Z`;
};
