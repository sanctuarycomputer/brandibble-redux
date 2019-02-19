import { Duration, DateTime } from 'luxon';
import { DateTimeFormats } from './constants';

const { HOURS_MINUTES } = DateTimeFormats;

export default (minutes) => {
  /**
   * Here we use Luxon's Duration object to convert
   * our time in minutes to a 24 hr time string
   */
  const minutesAsDuration = Duration.fromObject({ minutes }).toFormat(
    HOURS_MINUTES,
  );

  /**
   * We then create a valid DateTime object
   * from that Duration
   */
  return DateTime.fromFormat(minutesAsDuration, HOURS_MINUTES);
};
