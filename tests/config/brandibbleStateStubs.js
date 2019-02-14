import { cateringLocationStub, oloLocationStub } from './locationStubs';
import {
  cateringOrderDataStub,
  oloOrderDataStub,
  unconfiguredOrderDataStub,
} from './orderDataStubs';

/**
 * Catering
 */
export const brandibbleStateForCateringOrderStub = {
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
export const brandibbleStateForOloOrderStub = {
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

/**
 * Unconfigured
 */
export const brandibbleStateForUnconfiguredOrderStub = {
  data: {
    locations: {},
  },
  session: {
    order: {
      orderData: unconfiguredOrderDataStub,
    },
  },
};
