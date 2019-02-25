import { Constants } from 'brandibble';

const { OrderTypes } = Constants;

export const supportsCatering = (locationOrderTypesArray = []) =>
  locationOrderTypesArray.includes(OrderTypes.CATERING);

export const supportOnlineOrdering = (locationOrderTypesArray = []) =>
  locationOrderTypesArray.includes(OrderTypes.ONLINE_ORDERING);
