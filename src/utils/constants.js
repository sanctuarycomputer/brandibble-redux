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

export const OrderTypes = {
  ONLINE_ORDERING: 'olo',
  CATERING: 'catering'
};

export const ServiceTypes = {
  PICKUP: 'pickup',
  DELIVERY: 'delivery'
};

export const Asap = 'asap';
