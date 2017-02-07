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

export const customersValidateStub = {
  is_brandibble_active: true,
  is_brandibble_customer: true,
  is_levelup_connected: true,
  is_levelup_user: true,
  levelup_connected_email: 'api@brandibble.co',
}

export const SAMPLE_MENU_LOCATION_ID = 19;
export const SAMPLE_EMAIL = 'sanctuary-testing-email@example.com';
