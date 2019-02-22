import { Constants } from 'brandibble';

const { CATERING, ONLINE_ORDERING } = Constants;

export const supportsCatering = (locationOrderTypesArray = []) =>
  locationOrderTypesArray.includes(CATERING);

export const supportOnlineOrdering = (locationOrderTypesArray = []) =>
  locationOrderTypesArray.includes(ONLINE_ORDERING);
