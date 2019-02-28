import { cateringLocationStub, oloLocationStub } from './locationStubs';
import {
  cateringOrderDataStub,
  oloOrderDataStub,
  unconfiguredOrderDataStub,
} from './orderDataStubs';

/**
 * Catering
 */
export const stateForCateringOrderStub = {
  data: {
    locations: {
      locationsById: cateringLocationStub,
    },
  },
  session: {
    order: {
      orderData: cateringOrderDataStub,
    },
  },
};

export const stateForCateringOrderWithInvalidRequestedAt = {
  data: {
    locations: {
      locationsById: cateringLocationStub,
    },
  },
  session: {
    order: {
      orderData: {
        ...cateringOrderDataStub,
        requested_at: '2019-02-14T19:00:00Z',
      },
    },
  },
};

/**
 * OLO
 */
export const stateForOloOrderStub = {
  data: {
    locations: {
      locationsById: oloLocationStub,
    },
  },
  session: {
    order: {
      orderData: oloOrderDataStub,
    },
  },
};

export const stateForOloOrderStubWithWantsFutureOrder = {
  data: {
    locations: {
      locationsById: oloLocationStub,
    },
  },
  session: {
    order: {
      orderData: {
        ...oloOrderDataStub,
        wantsFutureOrder: true,
      },
    },
  },
};

export const stateForOloOrderStubWithAsapRequestedAt = {
  data: {
    locations: {
      locationsById: oloLocationStub,
    },
  },
  session: {
    order: {
      orderData: {
        ...oloOrderDataStub,
        requested_at: 'asap',
      },
    },
  },
};

export const stateForOloOrderStubWithValidRequestedAt = {
  data: {
    locations: {
      locationsById: oloLocationStub,
    },
  },
  session: {
    order: {
      orderData: {
        ...oloOrderDataStub,
        requested_at: '2019-02-14T20:45:00Z',
      },
    },
  },
};

/**
 * Unconfigured
 */
export const stateForUnconfiguredOrderStub = {
  data: {
    locations: {},
  },
  session: {
    order: {
      orderData: unconfiguredOrderDataStub,
    },
  },
};
