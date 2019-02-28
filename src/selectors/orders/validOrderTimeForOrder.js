import { createSelector } from 'reselect';
import { DateTime } from 'luxon';
import memoize from 'lodash.memoize';
import get from '../../utils/get';
import { SystemTimezoneMap, DateTimeFormats } from '../../utils/constants';

import convertDateTimeToMinutes from '../../utils/convertDateTimeToMinutes';
import convertMinutesToDateTime from '../../utils/convertMinutesToDateTime';

const { HOURS_MINUTES_MERIDIEM, YEAR_MONTH_DAY } = DateTimeFormats;

/**
 * The validOrderTimeForNow
 * represents the FIRST valid order time
 * for a location, regardless of when the order is
 * being requested for
 */
export const validOrderTimeForOrder = createSelector(
  state => get(state, 'session.order.orderData.location_id'),
  state => get(state, 'session.order.orderData.service_type'),
  state => get(state, 'data.locations.locationsById'),
  (locationIdForCurrentOrder, serviceTypeForCurrentOrder, allLocationsById) =>
    memoize(
      (
        luxonDateTimeFromOrderRequestedAt,
        todayAsLuxonDateTime = DateTime.local(),
      ) => {
        const locationForCurrentOrder = get(
          allLocationsById,
          `${locationIdForCurrentOrder}`,
        );

        /**
         * We could not find location for the current order
         * So we return null
         */
        if (!locationForCurrentOrder) return null;

        /**
         * Ensure timezone is correctly set
         */
        const locationForCurrentOrderTimezone =
          SystemTimezoneMap[get(locationForCurrentOrder, 'timezone')];
        const localTimezone = get(todayAsLuxonDateTime, 'zoneName');

        if (locationForCurrentOrderTimezone !== localTimezone) {
          todayAsLuxonDateTime = todayAsLuxonDateTime.setZone(
            locationForCurrentOrderTimezone,
          );
        }

        /**
         * If the requested at is in the past we return null
         *
         *
         */
        if (
          luxonDateTimeFromOrderRequestedAt.set({
            seconds: 0,
            milliseconds: 0,
          }) < todayAsLuxonDateTime.set({ seconds: 0, milliseconds: 0 })
        ) {
          return null;
        }

        /**
         * Days Ahead
         * Catering: null
         * OLO: integer
         */
        const daysAheadForServiceType = get(
          locationForCurrentOrder,
          `days_ahead.${serviceTypeForCurrentOrder}`,
        );

        /**
         * If days ahead exists
         * Let's ensure the requested_at is
         * within that threshold
         */
        if (daysAheadForServiceType) {
          const differenceInDays = luxonDateTimeFromOrderRequestedAt
            .diff(todayAsLuxonDateTime, 'days')
            .toObject().days;

          /**
           * If the requested_at is too far in advance we return null
           */
          if (differenceInDays > daysAheadForServiceType) return null;
        }

        const validTimesForLocationForCurrentOrder = get(
          locationForCurrentOrder,
          `valid_times.${serviceTypeForCurrentOrder}`,
        );
        const orderRequestedAtWeekday = luxonDateTimeFromOrderRequestedAt.weekdayLong.toLowerCase();
        const orderRequestedAtInMinutes = convertDateTimeToMinutes(
          luxonDateTimeFromOrderRequestedAt,
        );

        /**
         * We find the daypart (which contains the exact timeslot)
         * that our requested at fall within
         */
        const validTimeDaypartMatch = get(
          validTimesForLocationForCurrentOrder,
          `${orderRequestedAtWeekday}`,
        ).find(
          daypartForWeekday =>
            orderRequestedAtInMinutes >= get(daypartForWeekday, 'start_min') &&
            orderRequestedAtInMinutes <= get(daypartForWeekday, 'end_min'),
        );

        /**
         * If we found a match, but the daypart is not orderable/does not;
         * have an array of timeslots to match against we return null
         */
        if (
          !get(validTimeDaypartMatch, 'is_orderable') ||
          !get(validTimeDaypartMatch, 'times', []).length
        ) {
          return null;
        }

        /**
         * We find the exact/earliest timeslot that applies to our requested at
         */
        const earliestValidTimeslot = get(
          validTimeDaypartMatch,
          'times',
          [],
        ).reduce((lastTimeObject, currentTimeObject) => {
          if (!lastTimeObject) return currentTimeObject;

          if (
            orderRequestedAtInMinutes >= lastTimeObject.minutes &&
            orderRequestedAtInMinutes < currentTimeObject.minutes
          ) {
            return lastTimeObject;
          }

          return currentTimeObject;
        }, null);

        const luxonDateTimeFromEarliestValidTimeslot = convertMinutesToDateTime(
          get(earliestValidTimeslot, 'minutes'),
        );

        const {
          hour,
          minute,
        } = luxonDateTimeFromEarliestValidTimeslot.toObject();

        /**
         * We create a new luxon DateTime object from our order's requested at
         * with the hours and minutes set to that of the earliest valid timeslot,
         * we also reset seconds back to 0
         */
        const validOrderTimeForOrderAsLuxonDateTime = luxonDateTimeFromOrderRequestedAt.set(
          { hour, minute, seconds: 0 },
        );

        /**
         * The object we return mirrors that returned by the validOrderTimeForNow selector
         */
        return {
          date: validOrderTimeForOrderAsLuxonDateTime.toFormat(YEAR_MONTH_DAY),
          daypart: validTimeDaypartMatch.daypart,
          minutes: convertDateTimeToMinutes(
            validOrderTimeForOrderAsLuxonDateTime,
          ),
          time: validOrderTimeForOrderAsLuxonDateTime.toFormat(
            HOURS_MINUTES_MERIDIEM,
          ),
          utc: `${
            validOrderTimeForOrderAsLuxonDateTime
              .setZone('utc')
              .toISO()
              .split('.')[0]
          }Z`,
          weekday: orderRequestedAtWeekday,
        };
      },
    ),
);
