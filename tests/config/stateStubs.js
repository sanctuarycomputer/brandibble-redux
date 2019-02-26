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
