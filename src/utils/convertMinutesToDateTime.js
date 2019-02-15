import { Duration, DateTime } from 'luxon';

const TIME_FORMAT = 'h:mm';

export default (minutes) => {
  /**
   * Here we use Luxon's Duration object to convert
   * our time in minutes to a 24 hr time string
   */
  const minutesAsDuration = Duration.fromObject({ minutes }).toFormat(
    TIME_FORMAT,
  );

  /**
   * We then create a valid DateTime object
   * from that Duration
   */
  return DateTime.fromFormat(minutesAsDuration, TIME_FORMAT);
};
