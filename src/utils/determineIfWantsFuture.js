import { DateTime } from 'luxon';
import { Asap, WantsFutureReasons } from './constants';

export default (requestedAt, now = DateTime.local()) => {
  // If the requestedtAt is 'asap'
  // set wantsFuture to false
  if (requestedAt === Asap) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isAsap,
    };
  }

  const requestedAtAsLuxonDateTime = DateTime.fromISO(requestedAt);

  // If the requestedtAt is in the past (rare case)
  // set wantsFuture to false
  if (requestedAtAsLuxonDateTime < now) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isPast,
    };
  }

  // If the requestedtAt is exactly now (rare case)
  // set wantsFuture to false
  if (+requestedAtAsLuxonDateTime === +now) {
    return {
      wantsFuture: false,
      reason: WantsFutureReasons.isNow,
    };
  }

  // If the requestedAt is in the future
  // set wantsFuture to true
  if (requestedAtAsLuxonDateTime > now) {
    return {
      wantsFuture: true,
      reason: WantsFutureReasons.isFuture,
    };
  }
};
