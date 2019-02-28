import { DateTime } from 'luxon';
import { Asap } from './constants';

/**
 * An order can have a requested_at
 * of either 'asap' or a valid
 * ISO8601 datetime string
 */

export default (requestedAt, timezone) => {
  const requestedAtAsLuxonDateTime =
    requestedAt === Asap ? DateTime.local() : DateTime.fromISO(requestedAt);

  if (timezone) {
    return requestedAtAsLuxonDateTime.setZone(timezone);
  }

  return requestedAtAsLuxonDateTime;
};
