import Brandibble from 'brandibble';
import ENV from './environment';
import localforage from 'localforage';

localforage.config({name: 'brandibble-redux-test', storeName: 'brandibble-redux-test'});

export const brandibble = new Brandibble({
  apiKey: ENV.BRANDIBBLE_API_KEY,
  brandId: ENV.BRANDIBBLE_BRAND_ID,
  apiEndpoint: ENV.BRANDIBBLE_API_ENDPOINT,
  storage: localforage,
});

export const SAMPLE_MENU_LOCATION_ID = 19;
