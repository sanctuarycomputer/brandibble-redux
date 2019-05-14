export const ApiVersion = {
  V1: 'v1',
  V2: 'v2',
};

export const Status = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

export const ErrorCodes = {
  validateCart: {
    // TO DO: These have been duplicated below (nested under v1)
    // for cleaner usage within brandibble-redux itself.
    // I've opted not to remove the legacy formatting just yet,
    // as I am not sure which host apps are using them.
    locationIsClosed: 'orders.validate.location_closed',
    invalidItems: 'orders.validate.invalid_items',
    unmetDeliveryMinimum: 'orders.validate.delivery_minimum',
    [ApiVersion.V1]: {
      locationIsClosed: 'orders.validate.location_closed',
      invalidItems: 'orders.validate.invalid_items',
      unmetDeliveryMinimum: 'orders.validate.delivery_minimum',
    },
    [ApiVersion.V2]: {
      locationIsClosed: 'cart.validate.location_closed',
      invalidItems: 'cart.validate.invalid_cart',
      unmetDeliveryMinimum: 'cart.validate.delivery_minimum',
    },
  },
};

export const Defaults = {
  miscOptions: {
    include_utensils: true,
    notes_for_store: '',
    tip: 0,
    promo_code: '',
  },
};

export const Timezones = {
  PACIFIC: 'America/Los_Angeles',
  MOUNTAIN: 'America/Boise',
  CENTRAL: 'America/Chicago',
  EASTERN: 'America/New_York',
};

/**
 * System refers to Brandibble,
 * as Brandibble's timezones are inconsistent
 * with those used by most timezone libs (in our case luxon)
 */

export const SystemTimezoneMap = {
  'US/Pacific': Timezones.PACIFIC,
  'US/Mountain': Timezones.MOUNTAIN,
  'US/Central': Timezones.CENTRAL,
  'US/Eastern': Timezones.EASTERN,
};

export const MenuStatusCodes = {
  FUTURE_ORDER_REQUEST: 'Future order requested',
  ASAP_ORDER_REQUEST: "Order requested for 'asap'",
  INVALID_REQUESTED_AT: 'Requested at time is invalid',
  REQUESTED_AT_HAS_PASSED: 'Requested at time has passed',
  ORDERING_FOR_FIRST_AVAILABLE_VALID_TIME:
    'Ordering for first available valid time',
  ORDERING_FOR_FUTURE_DAYPART: 'Ordering for future daypart',
};

/**
 * These date time formats
 * work for Luxon and not
 * necessarily any/all DateTime libs
 */
export const DateTimeFormats = {
  HOURS_MINUTES: 'h:mm',
  HOURS_MINUTES_MERIDIEM: 'h:mm a',
  YEAR_MONTH_DAY: 'yyyy-MM-dd',
};

export const Asap = 'asap';

export const WantsFutureReasons = {
  isAsap: 'is asap',
  isPast: 'is past',
  isFuture: 'is future',
  isNow: 'is now',
};
