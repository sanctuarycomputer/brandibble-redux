export const Status = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
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

export const BrandibbleTimezoneMap = {
  'US/Pacific': Timezones.PACIFIC,
  'US/Mountain': Timezones.MOUNTAIN,
  'US/Central': Timezones.CENTRAL,
  'US/Eastern': Timezones.EASTERN,
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
