/**
 * First Times
 */

// OLO
export const firstTimeForOloLocationStub = {
  date: '2019-02-13',
  daypart: 'Lunch',
  minutes: 675,
  time: '11:15 AM',
  utc: '2019-02-13T19:15:00Z',
  weekday: 'wednesday',
};

// CATERING
export const firstTimeForCateringLocationStub = {
  date: '2019-02-13',
  daypart: 'Lunch',
  minutes: 675,
  time: '11:15 AM',
  utc: '2019-02-13T19:15:00Z',
  weekday: 'wednesday',
};

/**
 * Location Data
 */

// OLO
export const oloLocationsStub = {
  885: {
    current_daypart: {
      delivery: {},
      pickup: {},
    },
    days_ahead: {
      delivery: 6,
      pickup: 6,
    },
    first_times: {
      delivery: firstTimeForOloLocationStub,
      pickup: firstTimeForOloLocationStub,
    },
    skipped_dayparts: {
      delivery: {},
      pickup: {},
    },
    valid_times: {
      delivery: {},
      pickup: {},
    },
  },
};

// CATERING
export const cateringLocationsStub = {
  886: {
    current_daypart: {
      delivery: {},
      pickup: {},
    },
    days_ahead: {
      delivery: null,
      pickup: null,
    },
    first_times: {
      delivery: firstTimeForCateringLocationStub,
      pickup: firstTimeForCateringLocationStub,
    },
    skipped_dayparts: {
      delivery: {},
      pickup: {},
    },
    valid_times: {
      delivery: {},
      pickup: {},
    },
  },
};

/**
 * Order Data
 */

// OLO
export const oloOrderDataStub = {
  location_id: 885,
  service_type: 'pickup',
};

// CATERING
export const cateringOrderDataStub = {
  location_id: 886,
  service_type: 'pickup',
};

/**
 * Brandibble State
 */

// OLO
export const brandibbleStateForOloOrderStub = {
  data: {
    locations: {
      locationsById: oloLocationsStub,
    },
  },
  session: {
    order: {
      orderData: oloOrderDataStub,
    },
  },
};

// CATERING
export const brandibbleStateForCateringOrderStub = {
  data: {
    locations: {
      locationsById: cateringLocationsStub,
    },
  },
  session: {
    order: {
      orderData: cateringOrderDataStub,
    },
  },
};
