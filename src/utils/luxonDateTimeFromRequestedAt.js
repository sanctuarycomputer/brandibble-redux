import { DateTime } from 'luxon';
import { ASAP } from './constants';

/**
 * An order can have a requested_at
 * of either 'asap' or a valid
 * ISO8601 datetime string
 */

export default requestedAt =>
  requestedAt === ASAP ? DateTime.local() : DateTime.fromISO(requestedAt);
