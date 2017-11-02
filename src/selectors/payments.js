import { createSelector } from 'reselect';

export const paymentsCollection = state => state.session.payments.paymentsById;

export const paymentsAsArray = createSelector(
  paymentsCollection,
  payments => Object.values(payments),
);
