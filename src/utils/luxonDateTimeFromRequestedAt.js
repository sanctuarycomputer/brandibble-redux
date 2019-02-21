import { DateTime } from 'luxon';
import { Asap } from './constants';

/**
 * An order can have a requested_at
 * of either 'asap' or a valid
 * ISO8601 datetime string
 */

export default requestedAt =>
  requestedAt === Asap ? DateTime.local() : DateTime.fromISO(requestedAt);
